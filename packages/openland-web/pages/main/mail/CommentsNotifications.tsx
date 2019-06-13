import * as React from 'react';
import { XView } from 'react-mental';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-web/utils/useClient';
import { css } from 'linaria';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine'
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';

const wrapperClassName = css`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    @media (min-width: 1150px) {
        width: 674px;
        padding-left: 0px;
        padding-right: 0px;
    }

    flex-grow: 1;
    flex-shrink: 1;
`;

const MessagesWrapper = ({ children }: { children: any }) => {
    return (
        <XView alignItems="center">
            <div className={wrapperClassName}>{children}</div>
        </XView>
    );
};

export const CommentsNotifications = () => {
    // const client = useClient();
    const notificationCenterEngine = new NotificationCenterEngine({mocked: true});

    // const notifications = client.useMyNotifications({
    //     first: 100,
    // });

    // let comments = notifications.myNotifications
    //     .filter(({ content }) => {
    //         return !!content;
    //     })
    //     .map(item => {
    //         const { content } = item;

    //         const firstContent = content!![0];
    //         const comment = firstContent!!.comment!!;
    //         const peer = firstContent!!.peer!!;

    //         let replyQuoteText;
    //         if (comment.parentComment) {
    //             const parentComment = comment.parentComment;
    //             replyQuoteText = parentComment.comment.message;
    //         } else {
    //             replyQuoteText = peer.peerRoot.message;
    //         }

    //         return {
    //             ...comment.comment,
    //             peerRootId: peer.peerRoot.id,
    //             isSubscribedMessageComments: !!peer.subscription!!,
    //             replyQuoteText,
    //         };
    //     });

    let comments = notificationCenterEngine.commentsDataSource

    return (
        <XView paddingTop={24} flexGrow={1} flexShrink={1}>
            <MessagesWrapper>
                <XView
                    opacity={0.9}
                    fontSize={18}
                    fontWeight={'600'}
                    lineHeight={1.33}
                    color="#000"
                >
                    Comments
                </XView>
            </MessagesWrapper>

            <XScrollView3 useDefaultScroll flexGrow={1} flexShrink={1}>
                {comments.map((message, key) => {
             
                    return (
                        <MessagesWrapper key={key}>
                            <MessageComponent
                                message={message}
                                replyQuoteText={message.replyQuoteText}
                                noSelector
                                isCommentNotification
                                onCommentBackToUserMessageClick={() => {
                                    // openCommentsModal({
                                    //     messageId: item.peerRootId,
                                    // conversationId: item.message,
                                    // });
                                }}
                            />
                        </MessagesWrapper>
                    );
                })}
            </XScrollView3>
        </XView>
    );
};
