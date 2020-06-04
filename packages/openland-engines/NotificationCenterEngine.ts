import { Queue } from 'openland-y-utils/Queue';
import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { DataSource } from 'openland-y-utils/DataSource';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { createLogger } from 'mental-log';
import { DataSourceMessageItem } from './messenger/ConversationEngine';
import * as Types from 'openland-api/spacex.types';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { backoff } from 'openland-y-utils/timer';
import { MyNotificationsCenter } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

const log = createLogger('Engine-NotificationCenter');

export type NotificationsDataSourceItem = DataSourceMessageItem;

const convertCommentNotification = (id: string, peer: Types.NotificationFragment_content_NewCommentNotification_peer, comment: Types.NotificationFragment_content_NewCommentNotification_comment): NotificationsDataSourceItem => {
    const peerRoot = peer.peerRoot;
    const peerRootId = peerRoot.__typename === 'CommentPeerRootMessage' ? peerRoot.message.id : (peerRoot.__typename === 'CommentPeerRootPost' ? peerRoot.post.id : '!');
    const room = peerRoot.__typename === 'CommentPeerRootMessage' ? peerRoot.chat : undefined;
    const replyQuoteText = peerRoot.__typename === 'CommentPeerRootMessage' ? (peerRoot.message.message || peerRoot.message.fallback) : undefined;

    return {
        ...convertMessage({
            ...comment.comment,
        }),

        peerRootId,
        peerRootType: peerRoot.__typename,
        room,
        isSubscribedMessageComments: !!peer.subscription!!,
        notificationId: id,
        replyQuoteText,
        notificationType: 'new_comment',

        // rewrite results from convertMessage
        key: id,
        isOut: false
    };
};

const notificationUnsupported = (id: string): NotificationsDataSourceItem => {
    const date = Date.now();

    return {
        ...convertMessage({
            __typename: 'GeneralMessage',
            id: id,
            date: date,
            sender: {
                __typename: 'User',
                id: 'mJMk3EkbzBs7dyPBPp9Bck0pxn',
                name: 'Openland Support',
                firstName: 'Openland Support',
                photo: 'https://ucarecdn.com/db12b7df-6005-42d9-87d6-46f15dd5b880/',
                online: true,
                isBot: false,
                lastName: null,
                email: null,
                lastSeen: null,
                shortname: null,
                primaryOrganization: null,
            },
            source: null,
            senderBadge: null,
            message: '*Notification type not supported*\nNotification is not supported on your version of Openland. Please update the app to view it.',
            fallback: '*Notification type not supported*\nNotification is not supported on your version of Openland. Please update the app to view it.',
            edited: false,
            commentsCount: 0,
            attachments: [],
            quotedMessages: [],
            reactions: [],
            spans: [{ __typename: 'MessageSpanBold', offset: 0, length: 33 }],
            overrideName: null,
            overrideAvatar: null
        }),

        notificationId: id,
        notificationType: 'unsupported',

        // rewrite results from convertMessage
        key: id,
        isOut: false
    };
};

export const convertNotification = (notification: Types.NotificationFragment): NotificationsDataSourceItem => {
    const content = notification.content;

    if (content && content.length && content[0].__typename === 'NewCommentNotification') {
        const firstContent = content[0] as Types.NotificationFragment_content_NewCommentNotification;
        const comment = firstContent.comment;
        const peer = firstContent.peer;

        return convertCommentNotification(notification.id, peer, comment);
    } else {
        return notificationUnsupported(notification.id);
    }
};

export class NotificationCenterEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly _dataSourceStored: DataSourceStored<NotificationsDataSourceItem>;
    readonly dataSource: DataSource<NotificationsDataSourceItem>;
    private lastNotificationRead: string | null = null;
    private isVisible: boolean = true;
    private maxSeq = 0;
    private lastReportedSeq = 0;
    private listenersCount = 0;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.client = this.engine.client;

        let provider: DataSourceStoredProvider<NotificationsDataSourceItem> = {
            loadMore: async (cursor?: string) => {
                log.log('loadMore (cursor: ' + cursor + ')');

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
            },
            onStarted: (state: string, items: NotificationsDataSourceItem[]) => {
                log.log('onStarted');

                let queue = new Queue();
                sequenceWatcher<MyNotificationsCenter>(state, (s, handler) => this.engine.client.subscribeMyNotificationsCenter({ state }, handler), (update) => {
                    if (!update.event) {
                        return null;
                    }
                    if (update.event.__typename === 'NotificationCenterUpdateBatch') {
                        queue.post({ state: update.event.state, events: update.event.updates });
                    } else if (update.event.__typename === 'NotificationCenterUpdateSingle') {
                        queue.post({ state: update.event.state, events: [update.event.update] });
                    }
                    this.handleSeqUpdated(update.event.seq);
                    return update.event.state;
                });
                (async () => {
                    while (true) {
                        let update = await queue.get();
                        for (let u of update.events) {
                            await backoff(() => this.handleEvent(u));
                        }
                        await backoff(() => this.handleStateProcessed(update.state));
                    }
                })();

                this.onNotificationsUpdated();
            },
        };

        this._dataSourceStored = new DataSourceStored(
            'notifications-9',
            engine.options.store,
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
                this.engine.client.mutateReadNotification({ notificationId: id });
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
                backoff(() => this.engine.client.mutateMyNotificationCenterMarkSeqRead({ seq }));
            })();
        }
    }

    private handleEvent = async (event: Types.NotificationCenterUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);

        if (event.__typename === 'NotificationReceived') {
            if (await this._dataSourceStored.hasItem(event.notification.id)) {
                return;
            }

            const converted = convertNotification(event.notification);
            await this._dataSourceStored.addItem(converted, 0);

            if (converted.notificationType === 'new_comment') {
                await this.engine.notifications.handleIncomingNotification(converted);
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
                const peerRoot = peer.peerRoot;
                const peerRootId = peerRoot.__typename === 'CommentPeerRootMessage' ? peerRoot.message.id : (peerRoot.__typename === 'CommentPeerRootPost' ? peerRoot.post.id : '!');
                const comment = event.content.comment;
                const subscription = !!event.content.peer.subscription;

                await this._dataSourceStored.updateAllItems(oldItem => {
                    if (comment && (oldItem.id === comment.comment.id)) {
                        return convertCommentNotification(oldItem.key, peer, comment);
                    }
                    if (oldItem.peerRootId === peerRootId) {
                        oldItem.replyQuoteText = peerRoot.__typename === 'CommentPeerRootMessage' ? (peerRoot.message.message || peerRoot.message.fallback) : undefined;
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