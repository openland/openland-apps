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
            <MobileMessageComponentInner {...props} />
        ) : (
            <DesktopMessageComponentInner {...props} messagesContext={props.messagesContextProps} />
        );
    },
);

export const MessageComponent = (props: MessageComponentProps) => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const isMobile = React.useContext(IsMobileContext);

    return (
        <MessageComponentInner
            {...props}
            messagesContextProps={messagesContextProps}
            isMobile={isMobile}
        />
    );
};
