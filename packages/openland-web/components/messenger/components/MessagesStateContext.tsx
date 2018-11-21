import * as React from 'react';

export interface MessagesStateContextProps {
    editMessageId: string | null;
    editMessage: string | null;
    setEditMessage: (id: string | null, message: string | null) => void;
    forwardMessagesId: Set<string> | null;
    conversationId: string | null;
    setForwardMessages: (id: Set<string> | null, conversationId: string | null) => void;
    forwardMessages: () => void;
    useForwardMessages: boolean;
    useForwardPlaceholder: boolean;
    useForwardHeader: boolean;
    changeForwardConverstion: () => void;
    replyMessageId: string | null;
    replyMessage: string | null;
    replyMessageSender: string | null;
    setReplyMessage: (id: string | null, message: string | null, sender: string | null, conversationId: string | null) => void;
    resetAll: () => void;
}

export const MessagesStateContext = React.createContext<MessagesStateContextProps>({
    editMessageId: null,
    editMessage: null,
    replyMessageId: null,
    replyMessageSender: null,
    replyMessage: null,
    forwardMessagesId: null,
    conversationId: null,
    useForwardMessages: false,
    useForwardPlaceholder: false,
    useForwardHeader: false,
    setEditMessage: () => null,
    setForwardMessages: () => null,
    forwardMessages: () => null,
    changeForwardConverstion: () => null,
    setReplyMessage: () => null,
    resetAll: () => null
});