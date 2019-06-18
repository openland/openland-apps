import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createComments } from './mocks';
import { DataSource } from 'openland-y-utils/DataSource';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { createLogger } from 'mental-log';
import { DataSourceMessageItem } from './messenger/ConversationEngine';
import * as Types from 'openland-api/Types';
import { NotificationCenterState, NotificationCenterStateHandler } from './NotificationCenterState';
import { ReadNotificationMutation } from 'openland-api';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';

const log = createLogger('Engine-NotificationCenter');

type NotificationCenterEngineOptions = {
    engine: MessengerEngine;
    mocked?: boolean;
};

export type NotificationsDataSourceItem = DataSourceMessageItem;

export const convertNotification = (
    notification: Types.NotificationFragment,
): NotificationsDataSourceItem | null => {
    const content = notification.content;

    // TODO go through notification.content, now take only first
    if (content && content.length && content[0]!!.__typename === 'NewCommentNotification') {
        const firstContent = content[0]!!;
        const comment = firstContent.comment;
        const peer = firstContent.peer;

        let replyQuoteText = peer.peerRoot.message.message;

        return {
            ...convertMessage({
                ...comment.comment,
            }),

            peerRootId: peer.peerRoot.message.id,
            room: peer.peerRoot.chat,
            isSubscribedMessageComments: !!peer.subscription!!,
            notificationId: notification.id,
            replyQuoteText,

            // rewrite results from convertMessage
            key: notification.id,
            isOut: false,
        };
    }

    return null;
};

export class NotificationCenterEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
    readonly _dataSourceStored: DataSourceStored<NotificationsDataSourceItem>;
    readonly dataSource: DataSource<NotificationsDataSourceItem>;
    private lastNotificationRead: string | null = null;
    private notifications: NotificationsDataSourceItem[] = [];
    private state: NotificationCenterState;
    private listeners: NotificationCenterStateHandler[] = [];
    private isVisible: boolean = true;

    constructor(options: NotificationCenterEngineOptions) {
        this.engine = options.engine;
        this.client = this.engine.client;
        this.isMocked = !!options.engine.options.mocked;
        this.state = new NotificationCenterState(true, []);

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
                        { fetchPolicy: 'network-only' },
                    );
                    const notificationCenterQuery = await this.engine.client.queryMyNotificationCenter(
                        { fetchPolicy: 'network-only' },
                    );

                    const notifications = notificationsQuery.myNotifications.items;
                    const items = [];

                    for (let notification of notifications) {
                        const convertedNotification = convertNotification(notification);

                        if (convertedNotification) {
                            items.push(convertedNotification);
                        }
                    }

                    this.notifications = [...items, ...this.notifications];
                    this.state = new NotificationCenterState(false, this.notifications);

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

                this.engine.global.handleNotificationsCenterStarted(state);
                this.engine.global.handleCommentsCenterStarted(state);

                this.notifications = [...items];
                this.state = new NotificationCenterState(false, this.notifications);

                this.onNotificationsUpdated();
            },
        };

        this._dataSourceStored = new DataSourceStored(
            'notifications2',
            options.engine.options.store,
            20,
            provider,
        );

        this.dataSource = this._dataSourceStored.dataSource;

        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);
    }

    handleNotificationReceived = async (
        event: Types.NotificationCenterUpdateFragment_NotificationReceived,
    ) => {
        const convertedNotification = convertNotification(event.notification);

        if (convertedNotification) {
            await this._dataSourceStored.addItem(convertedNotification, 0);

            this.notifications = [convertedNotification, ...this.notifications];
            this.state = new NotificationCenterState(false, this.notifications);

            this.onNotificationsUpdated();
        }
    };

    handleNotificationDeleted = async (
        event: Types.NotificationCenterUpdateFragment_NotificationDeleted,
    ) => {
        const id = event.notification.id;

        if (await this._dataSourceStored.hasItem(id)) {
            await this._dataSourceStored.removeItem(id);

            this.notifications = this.notifications.filter(n => n.key !== id);
            this.state = new NotificationCenterState(false, this.notifications);

            this.onNotificationsUpdated();
        }
    };

    handleCommentSubscriptionUpdate = async (event: Types.CommentUpdatesGlobal_event_CommentGlobalUpdateSingle_update) => {
        const peerRootId = event.peer.peerRoot.message.id;
        const subscription = !!event.peer.subscription;
        let updatedItems: NotificationsDataSourceItem[] = [];
        await this.notifications.map(i => {
            if (i.peerRootId === peerRootId) {
                i.isSubscribedMessageComments = subscription;
            }
            updatedItems.push(i)
        });
        await updatedItems.forEach(i => {
            this._dataSourceStored.updateItem(i);
        })
        this.notifications = updatedItems;
        this.state = new NotificationCenterState(false, this.notifications);
    };

    handleNotificationRead = async (
        event: Types.NotificationCenterUpdateFragment_NotificationRead,
    ) => {
        // Wonderfull SpaceX & Apollo
    };

    handleStateProcessed = async (state: string) => {
        await this._dataSourceStored.updateState(state);
    };

    getState = () => {
        return this.state;
    };

    subscribe = (listener: NotificationCenterStateHandler) => {
        this.listeners.push(listener);

        this.markReadIfNeeded();
        listener.onNotificationCenterUpdated(this.state);

        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                log.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    };

    private onNotificationsUpdated = () => {
        this.markReadIfNeeded();

        for (let l of this.listeners) {
            l.onNotificationCenterUpdated(this.state);
        }
    };

    private handleVisibleChanged = (isVisible: boolean) => {
        if (this.isVisible === isVisible) {
            return;
        }

        this.isVisible = isVisible;
        this.onNotificationsUpdated();
    };

    private markReadIfNeeded = () => {
        if (this.isVisible && this.notifications.length > 0 && this.listeners.length > 0) {
            const id = this.notifications[0].key;

            if (id !== this.lastNotificationRead) {
                this.lastNotificationRead = id;
                this.engine.client.client.mutate(ReadNotificationMutation, {
                    notificationId: id,
                });
            }
        }
    };
}
