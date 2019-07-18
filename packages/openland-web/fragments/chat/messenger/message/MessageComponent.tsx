import * as React from 'react';
import { MessagesStateContext } from '../MessagesStateContext';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';

export const MessageComponent = React.memo<MessageComponentProps>(props => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    return (
        <>
            <IsActivePoliteContext.Consumer>
                {isActive => (
                    <DesktopMessageComponentInner
                        isModal={props.isModal}
                        isCommentNotification={props.isCommentNotification}
                        isComment={props.isComment}
                        isPinned={props.isPinned}
                        isChannel={props.isChannel}
                        isActive={isActive}
                        usernameOfRepliedUser={props.usernameOfRepliedUser}
                        showNumberOfComments={props.showNumberOfComments}
                        deleted={props.deleted}
                        commentDepth={props.commentDepth}
                        commentProps={props.commentProps}
                        noSelector={props.noSelector}
                        message={props.message}
                        conversationId={props.conversationId}
                        onlyLikes={props.onlyLikes}
                        me={props.me}
                        conversationType={props.conversationType}
                        messagesContext={messagesContextProps}
                        room={props.room}
                        replyQuoteText={props.replyQuoteText}
                        onCommentBackToUserMessageClick={props.onCommentBackToUserMessageClick}
                        onCommentNotificationsReplyClick={props.onCommentNotificationsReplyClick}
                    />
                )}
            </IsActivePoliteContext.Consumer>
        </>
    );
});
