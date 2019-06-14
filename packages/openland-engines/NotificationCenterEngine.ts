import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createComments } from './mocks';
import { DataSource } from 'openland-y-utils/DataSource';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { createLogger } from 'mental-log';
import { DataSourceMessageItem } from './messenger/ConversationEngine';

const log = createLogger('Engine-NotificationCenter');

type NotificationCenterEngineOptions = {
    engine: MessengerEngine;
    mocked?: boolean;
};

export type NotificationsDataSourceItemStored = DataSourceMessageItem;

export class NotificationCenterEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
    readonly _dataSourceStored: DataSourceStored<NotificationsDataSourceItemStored>;
    readonly dataSource: DataSource<NotificationsDataSourceItemStored>;

    constructor(options: NotificationCenterEngineOptions) {
        this.engine = options.engine;
        this.client = this.engine.client;
        this.isMocked = !!options.engine.options.mocked;

        let provider: DataSourceStoredProvider<NotificationsDataSourceItemStored> = {
            loadMore: async (cursor?: string) => {
                log.log('loadMore (cursor: ' + cursor + ')');

                if (this.isMocked) {
                    return {
                        items: createComments().map(convertMessage),
                        cursor: undefined,
                        state: '',
                    };
                } else {
                    let notifications = await this.engine.client.queryMyNotifications(
                        { first: 100 },
                    );

                    const items = [];

                    for (let notification of notifications.myNotifications) {
                        const content = notification.content;

                        // TODO go through notification.content, now take only first
                        if (
                            notification.content &&
                            notification.content.length &&
                            notification.content[0]!!.__typename === 'NewCommentNotification'
                        ) {
                            const firstContent = content!![0];
                            const comment = firstContent!!.comment!!;
                            const peer = firstContent!!.peer!!;

                            let replyQuoteText;
                            if (comment.parentComment) {
                                const parentComment = comment.parentComment;
                                replyQuoteText = parentComment.comment.message;
                            } else {
                                replyQuoteText = peer.peerRoot.message.message;
                            }

                            items.push({
                                ...convertMessage({
                                    ...comment.comment,
                                }),
                                peerRootId: peer.peerRoot.message.id,
                                isSubscribedMessageComments: !!peer.subscription!!,
                                notificationId: notification.id,
                                replyQuoteText,
                            });
                        }
                    }

                    return {
                        items,
                        cursor: undefined,
                        state: '',
                    };
                }
            },
            onStarted: (state: string) => {
                log.log('onStarted');
                
                this.engine.global.handleNotificationsCenterStarted(state);
            },
        };

        this._dataSourceStored = new DataSourceStored(
            'notifications',
            options.engine.options.store,
            20,
            provider,
        );

        this.dataSource = this._dataSourceStored.dataSource;
    }

    handleNotificationReceived = async (event: any) => {
        await this.engine.client.refetchMyNotificationCenter();
    }

    handleNotificationDeleted = async (event: any) => {
        await this.engine.client.refetchMyNotificationCenter();
    }

    handleNotificationRead = async (event: any) => {
        await this.engine.client.refetchMyNotificationCenter();
    }

    handleStateProcessed = async (state: string) => {
        await this._dataSourceStored.updateState(state);
    }
}
