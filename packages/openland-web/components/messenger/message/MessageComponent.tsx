import * as React from 'react';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';

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
                conversation={props.conversation}
                me={props.me}
                conversationType={props.conversationType}
                editPostHandler={props.editPostHandler}
            />
        ) : (
            <DesktopMessageComponentInner
                message={props.message}
                conversation={props.conversation}
                me={props.me}
                conversationType={props.conversationType}
                editPostHandler={props.editPostHandler}
                messagesContext={props.messagesContextProps}
            />
        );
    },
);

export const MessageComponent = (props: MessageComponentProps) => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const isMobile = React.useContext(IsMobileContext);

    return (
        <MessageComponentInner
            message={props.message}
            conversation={props.conversation}
            me={props.me}
            conversationType={props.conversationType}
            editPostHandler={props.editPostHandler}
            messagesContextProps={messagesContextProps}
            isMobile={isMobile}
        />
    );
};
