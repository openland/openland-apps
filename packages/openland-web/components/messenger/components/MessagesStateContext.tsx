import * as React from 'react';

export interface MessagesStateContextProps {
    editMessageId: string | null;
    editMessage: string | null;
    setEditMessage: (id: string | null, message: string | null) => void;
    forwardMessagesId: string[] | null;
    conversationId: string | null;
    forwardMessages: (id: string[] | null, conversationId: string | null) => void;
}

export const MessagesStateContext = React.createContext<MessagesStateContextProps>({
    editMessageId: null,
    editMessage: null,
    forwardMessagesId: null,
    conversationId: null,
    setEditMessage: (id: string | null, message: string | null) => {
        return {id: id, message: message};
    },
    forwardMessages: (id: string[] | null, conversationId: string | null) => {
        return {id: id, conversationId: conversationId};
    }
});