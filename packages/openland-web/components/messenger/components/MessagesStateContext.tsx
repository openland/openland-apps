import * as React from 'react';

export interface MessagesStateContextProps {
    editMessageId: string | null;
    editMessage: string | null;
    setEditMessage: (id: string | null, message: string | null) => void;
    forwardMessagesId: Set<string> | null;
    conversationId: string | null;
    setForwardMessages: (id: Set<string> | null, conversationId: string | null) => void;
    replyMessageId: string | null;
    replyMessage: string | null;
    replyMessageSender: string | null;
    setReplyMessage: (id: string | null, message: string | null, sender: string | null, conversationId: string | null) => void;
}

export const MessagesStateContext = React.createContext<MessagesStateContextProps>({
    editMessageId: null,
    editMessage: null,
    replyMessageId: null,
    replyMessageSender: null,
    replyMessage: null,
    forwardMessagesId: null,
    conversationId: null,
    setEditMessage: (id: string | null, message: string | null) => {
        return {
            id: id, 
            message: message
        };
    },
    setForwardMessages: (id: Set<string> | null, conversationId: string | null) => {
        return {
            id: id, 
            conversationId: conversationId
        };
    },
    setReplyMessage: (id: string | null, message: string | null, sender: string | null, conversationId: string | null) => {
        return {
            id: id,
            message: message,
            sender: sender,
            conversationId: conversationId
        };
    }
});