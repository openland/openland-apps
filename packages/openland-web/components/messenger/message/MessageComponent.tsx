import * as React from 'react';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';

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
                conversation={props.conversation}
                me={props.me}
                conversationType={props.conversationType}
                editPostHandler={props.editPostHandler}
            />
        ) : (
            <>
                <DesktopMessageComponentInner
                    message={props.message}
                    conversation={props.conversation}
                    me={props.me}
                    conversationType={props.conversationType}
                    editPostHandler={props.editPostHandler}
                    messagesContext={props.messagesContextProps}
                />
                {props.isChannel && !props.message.isService && (
                    <XView width={100}>
                        <XButton
                            text="Discuss"
                            size="default"
                            query={{ field: 'comments', value: props.message.id }}
                        />
                    </XView>
                )}
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
            isChannel={props.isChannel}
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
