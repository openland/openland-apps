import * as React from 'react';

export interface MessagesStateContextProps {
    editMessageId: string | null;
    editMessage: string | null;
    setEditMessage: (id: string | null, message: string | null) => void;
    forwardMessagesId: Set<string> | null;
    setForwardMessages: (id: Set<string> | null) => void;
    forwardMessages: () => void;
    useForwardMessages: boolean;
    useForwardPlaceholder: boolean;
    useForwardHeader: boolean;
    changeForwardConverstion: () => void;
    replyMessagesId: Set<string> | null;
    replyMessages: Set<string> | null;
    replyMessagesSender: Set<string> | null;
    setReplyMessages: (id: Set<string> | null, messages: Set<string> | null, sender: Set<string> | null) => void;
    resetAll: () => void;
}

export const MessagesStateContext = React.createContext<MessagesStateContextProps>({
    editMessageId: null,
    editMessage: null,
    replyMessagesId: null,
    replyMessagesSender: null,
    replyMessages: null,
    forwardMessagesId: null,
    useForwardMessages: false,
    useForwardPlaceholder: false,
    useForwardHeader: false,
    setEditMessage: () => null,
    setForwardMessages: () => null,
    forwardMessages: () => null,
    changeForwardConverstion: () => null,
    setReplyMessages: () => null,
    resetAll: () => null
});