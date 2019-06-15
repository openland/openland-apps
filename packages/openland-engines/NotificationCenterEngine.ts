import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createComments } from './mocks';
import { DataSource } from 'openland-y-utils/DataSource';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { createLogger } from 'mental-log';
import { DataSourceMessageItem } from './messenger/ConversationEngine';
import * as Types from 'openland-api/Types';

const log = createLogger('Engine-NotificationCenter');

type NotificationCenterEngineOptions = {
    engine: MessengerEngine;
    mocked?: boolean;
};

export type NotificationsDataSourceItem = DataSourceMessageItem;

export const convertNotification = (notification: Types.NotificationFragment): NotificationsDataSourceItem | null => {
    const content = notification.content;

    // TODO go through notification.content, now take only first
    if (content && content.length && content[0]!!.__typename === 'NewCommentNotification') {
        const firstContent = content[0]!!;
        const comment = firstContent.comment;
        const peer = firstContent.peer;

        let replyQuoteText;

        if (comment.parentComment) {
            replyQuoteText = comment.parentComment.comment.message;
        } else {
            replyQuoteText = peer.peerRoot.message.message;
        }

        return {
            ...convertMessage({
                ...comment.comment,
            }),

            key: notification.id,
            peerRootId: peer.peerRoot.message.id,
            room: peer.peerRoot.chat,
            isSubscribedMessageComments: !!peer.subscription!!,
            notificationId: notification.id,
            replyQuoteText,
        }
    }

    return null
}

export class NotificationCenterEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
    readonly _dataSourceStored: DataSourceStored<NotificationsDataSourceItem>;
    readonly dataSource: DataSource<NotificationsDataSourceItem>;

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
                        const convertedNotification = convertNotification(notification);

                        if (convertedNotification) {
                            items.push(convertedNotification);
                        }
                    }

                    return {
                        items,
                        cursor: notificationsQuery.myNotifications.cursor || undefined,
                        state: notificationCenterQuery.myNotificationCenter.state.state!!,
                    };
                }
            },
            onStarted: (state: string) => {
                log.log('onStarted');
                
                this.engine.global.handleNotificationsCenterStarted(state);
            },
        };

        this._dataSourceStored = new DataSourceStored(
            'notifications2',
            options.engine.options.store,
            20,
            provider,
        );

        this.dataSource = this._dataSourceStored.dataSource;
    }

    handleNotificationReceived = async (event: Types.NotificationCenterUpdateFragment_NotificationReceived) => {
        const convertedNotification = convertNotification(event.notification);

        if (convertedNotification) {
            await this._dataSourceStored.addItem(
                convertedNotification,
                0
            );
        }
    }

    handleNotificationDeleted = async (event: Types.NotificationCenterUpdateFragment_NotificationDeleted) => {
        const id = event.notification.id;

        if (await this._dataSourceStored.hasItem(id)) {
            await this._dataSourceStored.removeItem(id);
        }
    }

    handleNotificationRead = async (event: Types.NotificationCenterUpdateFragment_NotificationRead) => {
        // Wonderfull SpaceX
    }

    handleStateProcessed = async (state: string) => {
        await this._dataSourceStored.updateState(state);
    }
}
