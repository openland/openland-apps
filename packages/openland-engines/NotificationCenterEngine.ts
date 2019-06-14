import { MyNotifications_myNotifications_content_comment_comment } from 'openland-api/Types';
import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createComments } from './mocks';
import { DataSource } from 'openland-y-utils/DataSource';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';

const hackChangeCommentIdToMessageId = ({
    item,
    messageId,
}: {
    item: MyNotifications_myNotifications_content_comment_comment & {
        isSubscribedMessageComments: boolean;
    };
    messageId: string;
}): MyNotifications_myNotifications_content_comment_comment & {
    isSubscribedMessageComments: boolean;
} => {
    return { ...item, id: messageId };
};

type NotificationCenterEngineOptions = {
    engine: MessengerEngine;
    mocked?: boolean;
};

type NotificationsDataSourceItemStored = any;

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
                if (this.isMocked) {
                    return {
                        items: createComments().map(convertMessage),
                        cursor: undefined,
                        state: '',
                    };
                } else {
                    let notifications = await this.engine.client.queryMyNotifications(
                        { first: 100 },
                        { fetchPolicy: 'network-only' },
                    );

                    const items = notifications.myNotifications
                        .filter(({ content }) => !!content)
                        .map(item => {
                            const { content } = item;

                            const firstContent = content!![0];
                            const comment = firstContent!!.comment!!;
                            const peer = firstContent!!.peer!!;

                            let replyQuoteText;
                            if (comment.parentComment) {
                                const parentComment = comment.parentComment;
                                replyQuoteText = parentComment.comment.message;
                            } else {
                                replyQuoteText = peer.peerRoot.message;
                            }

                            return {
                                ...comment.comment,
                                peerRootId: peer.peerRoot.message.id,
                                isSubscribedMessageComments: !!peer.subscription!!,
                                replyQuoteText,
                            };
                        })
                        .map(convertMessage);

                    return {
                        items,
                        cursor: undefined,
                        state: '',
                    };
                }
            },
            onStarted: (state: string) => {
                console.log('notifications started');
                //
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
}
