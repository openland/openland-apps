import * as React from 'react';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';
import { IsActiveContext, useCheckPerf } from 'openland-web/pages/main/mail/components/Components';

const MessageComponentInner = React.memo(
    (
        props: MessageComponentProps & {
            isMobile: boolean;
            messagesContextProps: MessagesStateContextProps;
        },
    ) => {
        return props.isMobile ? (
            <MobileMessageComponentInner
                message={props.message}
                me={props.me}
                conversationType={props.conversationType}
            />
        ) : (
            <>
                <DesktopMessageComponentInner
                    onCommentBackToUserMessageClick={props.onCommentBackToUserMessageClick}
                    usernameOfRepliedUser={props.usernameOfRepliedUser}
                    deleted={props.deleted}
                    showNumberOfComments={props.showNumberOfComments}
                    isModal={props.isModal}
                    isPinned={props.isPinned}
                    commentDepth={props.commentDepth}
                    isComment={props.isComment}
                    commentProps={props.commentProps}
                    noSelector={props.noSelector}
                    message={props.message}
                    conversationId={props.conversationId}
                    isChannel={props.isChannel}
                    onlyLikes={props.onlyLikes}
                    me={props.me}
                    conversationType={props.conversationType}
                    messagesContext={props.messagesContextProps}
                    room={props.room}
                />
            </>
        );
    },
);

export const MessageComponent = (props: MessageComponentProps) => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const isMobile = React.useContext(IsMobileContext);

    // useCheckPerf({ name: `MessageComponent: ${props.message.text}` });

    return (
        <MessageComponentInner
            onCommentBackToUserMessageClick={props.onCommentBackToUserMessageClick}
            usernameOfRepliedUser={props.usernameOfRepliedUser}
            deleted={props.deleted}
            showNumberOfComments={props.showNumberOfComments}
            commentDepth={props.commentDepth}
            isModal={props.isModal}
            isPinned={props.isPinned}
            isComment={props.isComment}
            commentProps={props.commentProps}
            noSelector={props.noSelector}
            onlyLikes={props.onlyLikes}
            isChannel={props.isChannel}
            message={props.message}
            conversationId={props.conversationId}
            me={props.me}
            conversationType={props.conversationType}
            messagesContextProps={messagesContextProps}
            isMobile={isMobile}
            room={props.room}
        />
    );
};
