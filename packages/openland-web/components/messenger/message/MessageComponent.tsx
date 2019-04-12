import * as React from 'react';
import { XView } from 'react-mental';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';
import { XButton } from 'openland-x/XButton';
import { XWithRole } from 'openland-x-permissions/XWithRole';

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
                    message={props.message}
                    conversationId={props.conversationId}
                    isChannel={props.isChannel}
                    onlyLikes={props.onlyLikes}
                    me={props.me}
                    conversationType={props.conversationType}
                    messagesContext={props.messagesContextProps}
                />
                <XWithRole role={['feature-non-production']}>
                    {props.hasComments && (
                        <XView width={150}>
                            <XButton
                                text={
                                    !props.message.commentsCount
                                        ? `Discuss`
                                        : `${props.message.commentsCount} Comments`
                                }
                                size="default"
                                query={{ field: 'comments', value: props.message.id }}
                            />
                        </XView>
                    )}
                </XWithRole>
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
