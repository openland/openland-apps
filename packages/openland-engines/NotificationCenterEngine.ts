import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createComments, notificationUnsupported } from './mocks';
import { DataSource } from 'openland-y-utils/DataSource';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { createLogger } from 'mental-log';
import { DataSourceMessageItem } from './messenger/ConversationEngine';
import * as Types from 'openland-api/Types';
import { ReadNotificationMutation, MyNotificationCenterMarkSeqReadMutation } from 'openland-api';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { SequenceModernWatcher } from './core/SequenceModernWatcher';
import { backoff } from 'openland-y-utils/timer';

const log = createLogger('Engine-NotificationCenter');

type NotificationCenterEngineOptions = {
    engine: MessengerEngine;
    mocked?: boolean;
};

export type NotificationsDataSourceItem = DataSourceMessageItem;

const convertCommentNotification = (id: string, peer: Types.NotificationFragment_content_peer, comment: Types.NotificationFragment_content_comment): NotificationsDataSourceItem => {
    const replyQuoteText = peer.peerRoot.message.message || peer.peerRoot.message.fallback;

    return {
        ...convertMessage({
            ...comment.comment,
        }),

        peerRootId: peer.peerRoot.message.id,
        room: peer.peerRoot.chat,
        isSubscribedMessageComments: !!peer.subscription!!,
        notificationId: id,
        replyQuoteText,
        notificationType: 'new_comment',

        // rewrite results from convertMessage
        key: id,
        isOut: false
    }
}

export const convertNotification = (notification: Types.NotificationFragment): NotificationsDataSourceItem => {
    const content = notification.content;

    // TODO go through notification.content, now take only first
    if (content && content.length && content[0]!!.__typename === 'NewCommentNotification') {
        const firstContent = content[0]!!;
        const comment = firstContent.comment;
        const peer = firstContent.peer;

        return convertCommentNotification(notification.id, peer, comment);
    } else {
        return notificationUnsupported(notification.id);
    }
}

export class NotificationCenterEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
    readonly _dataSourceStored: DataSourceStored<NotificationsDataSourceItem>;
    readonly dataSource: DataSource<NotificationsDataSourceItem>;
    private lastNotificationRead: string | null = null;
    private isVisible: boolean = true;
    private watcher: SequenceModernWatcher<Types.MyNotificationsCenter, Types.MyNotificationsCenterVariables> | null = null;
    private maxSeq = 0;
    private lastReportedSeq = 0;
    private listenersCount = 0;

    constructor(options: NotificationCenterEngineOptions) {
        this.engine = options.engine;
        this.client = this.engine.client;
        this.isMocked = !!options.engine.options.mocked;

        let provider: DataSourceStoredProvider<NotificationsDataSourceItem> = {
            loadMore: async (cursor?: string) => {
                log.log('loadMore (cursor: ' + cursor + ')');

                if (this.isMocked) {
                    return {
                        items: createComments().map(convertMessage),
                        cursor: undefined,
                        state: '',
                    };
                } else {
                    const notificationsQuery = await this.engine.client.queryMyNotifications(
                        { first: 20, before: cursor },
                        { fetchPolicy: 'network-only' }
                    );
                    const notificationCenterQuery = await this.engine.client.queryMyNotificationCenter({ fetchPolicy: 'network-only' });

                    const notifications = notificationsQuery.myNotifications.items;
                    const items = [];

                    for (let notification of notifications) {
                        const converted = convertNotification(notification);

                        items.push(converted);
                    }

                    this.onNotificationsUpdated();

                    return {
                        items,
                        cursor: notificationsQuery.myNotifications.cursor || undefined,
                        state: notificationCenterQuery.myNotificationCenter.state.state!!,
                    };
                }
            },
            onStarted: (state: string, items: NotificationsDataSourceItem[]) => {
                log.log('onStarted');

                this.watcher = new SequenceModernWatcher('notificationCenter', this.engine.client.subscribeMyNotificationsCenter({ state }), this.engine.client.client, this.handleEvent, this.handleSeqUpdated, undefined, state, async (st) => {
                    await this.handleStateProcessed(st);
                });

                this.onNotificationsUpdated();
            },
        };

        this._dataSourceStored = new DataSourceStored(
            'notifications5',
            options.engine.options.store,
            20,
            provider,
            100
        );

        this.dataSource = this._dataSourceStored.dataSource;

        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);
    }

    handleStateProcessed = async (state: string) => {
        await this._dataSourceStored.updateState(state);
    }

    subscribe = () => {
        ++this.listenersCount;
        this.markReadIfNeeded();
        return () => {
            --this.listenersCount;
        };
    }

    private onNotificationsUpdated = () => {
        this.markReadIfNeeded();
    }

    private handleVisibleChanged = (isVisible: boolean) => {
        if (this.isVisible === isVisible) {
            return;
        }

        this.isVisible = isVisible;

        this.markReadIfNeeded();
        this.reportSeqIfNeeded();
    }

    private markReadIfNeeded = () => {
        if (this.isVisible && this.dataSource.getSize() > 0 && this.listenersCount > 0) {
            const id = this.dataSource.getAt(0).key;

            if (id !== this.lastNotificationRead) {
                this.lastNotificationRead = id;
                this.engine.client.client.mutate(ReadNotificationMutation, {
                    notificationId: id
                });
            }
        }
    }

    private handleSeqUpdated = (seq: number) => {
        this.maxSeq = Math.max(seq, this.maxSeq);

        this.reportSeqIfNeeded();
    }

    private reportSeqIfNeeded = () => {
        if (this.isVisible && this.lastReportedSeq < this.maxSeq) {
            this.lastReportedSeq = this.maxSeq;
            let seq = this.maxSeq;
            (async () => {
                backoff(() => this.engine.client.client.mutate(MyNotificationCenterMarkSeqReadMutation, { seq }));
            })();
        }
    }

    private handleEvent = async (event: Types.NotificationCenterUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);

        if (event.__typename === 'NotificationReceived') {
            const converted = convertNotification(event.notification);

            await this._dataSourceStored.addItem(converted, 0);

            if (converted.notificationType === 'new_comment') {
                this.engine.notifications.handleIncomingNotification(event);
            }

            this.onNotificationsUpdated();
        } else if (event.__typename === 'NotificationDeleted') {
            const id = event.notification.id;

            if (await this._dataSourceStored.hasItem(id)) {
                await this._dataSourceStored.removeItem(id);

                this.onNotificationsUpdated();
            }
        } else if (event.__typename === 'NotificationUpdated') {
            const id = event.notification.id;
            const converted = convertNotification(event.notification);

            if (await this._dataSourceStored.hasItem(id)) {
                await this._dataSourceStored.updateItem(converted);
                this.onNotificationsUpdated();
            }
        } else if (event.__typename === 'NotificationContentUpdated') {
            if (event.content.__typename === 'UpdatedNotificationContentComment') {
                const peer = event.content.peer;
                const peerMessage = peer.peerRoot.message;
                const peerRootId = peerMessage.id;
                const comment = event.content.comment;
                const subscription = !!event.content.peer.subscription;

                await this._dataSourceStored.updateAllItems(oldItem => {
                    if (comment && (oldItem.id === comment.comment.id)) {
                        return convertCommentNotification(oldItem.key, peer, comment);
                    }
                    if (oldItem.peerRootId === peerRootId) {
                        oldItem.replyQuoteText = peerMessage.message || peerMessage.fallback;
                        oldItem.isSubscribedMessageComments = subscription;
    
                        return oldItem;
                    }
                    return undefined;
                });
            }
        } else if (event.__typename === 'NotificationRead') {
            // Ignore.
        } else {
            log.log('Unhandled update');
        }
    }
}