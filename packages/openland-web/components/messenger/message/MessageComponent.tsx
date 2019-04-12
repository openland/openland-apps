import * as React from 'react';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';

const MessageComponentInner = React.memo(
    (
        props: MessageComponentProps & {
            isChannel: boolean;
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
                    isModal={props.isModal}
                    isPinned={props.isPinned}
                    commentDepth={props.commentDepth}
                    isComment={props.isComment}
                    onCommentReplyClick={props.onCommentReplyClick}
                    noSelector={props.noSelector}
                    hasComments={props.hasComments}
                    message={props.message}
                    conversationId={props.conversationId}
                    isChannel={props.isChannel}
                    onlyLikes={props.onlyLikes}
                    me={props.me}
                    conversationType={props.conversationType}
                    messagesContext={props.messagesContextProps}
                />
            </>
        );
    },
);

export const MessageComponent = (
    props: MessageComponentProps & {
        isChannel: boolean;
    },
) => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const isMobile = React.useContext(IsMobileContext);

    return (
        <MessageComponentInner
            commentDepth={props.commentDepth}
            isModal={props.isModal}
            isPinned={props.isPinned}
            isComment={props.isComment}
            onCommentReplyClick={props.onCommentReplyClick}
            noSelector={props.noSelector}
            hasComments={props.hasComments}
            onlyLikes={props.onlyLikes}
            isChannel={props.isChannel}
            message={props.message}
            conversationId={props.conversationId}
            me={props.me}
            conversationType={props.conversationType}
            messagesContextProps={messagesContextProps}
            isMobile={isMobile}
        />
    );
};
