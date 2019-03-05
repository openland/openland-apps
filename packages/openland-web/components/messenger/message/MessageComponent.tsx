import * as React from 'react';
import { MessagesStateContext } from '../MessagesStateContext';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { MobileMessageComponentInner } from './MessageMobileComponent';
import { DesktopMessageComponentInner, MessageComponentProps } from './MessageDesktopComponent';

export const MessageComponent = (props: MessageComponentProps) => {
    // const messagesContextProps = React.useContext(MessagesStateContext);
    // const { isMobile } = React.useContext(MobileSidebarContext);

    return <DesktopMessageComponentInner {...props} messagesContext={{}} />;
};
