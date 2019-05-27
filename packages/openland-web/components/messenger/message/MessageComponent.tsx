import * as React from 'react';
import { MessagesStateContext } from '../MessagesStateContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';

export const MessageComponent = React.memo<MessageComponentProps>((props) => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const isMobile = React.useContext(IsMobileContext);
    return isMobile ? (
        <MobileMessageComponentInner
            message={props.message}
            me={props.me}
            conversationType={props.conversationType}
        />
    ) : (
            <>
                <IsActivePoliteContext.Consumer>
                    {isActive => <DesktopMessageComponentInner
                        onCommentBackToUserMessageClick={props.onCommentBackToUserMessageClick}
                        usernameOfRepliedUser={props.usernameOfRepliedUser}
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
                        messagesContext={messagesContextProps}
                        room={props.room}
                        isActive={isActive}
                    />}
                </IsActivePoliteContext.Consumer>

            </>
        );
},
);