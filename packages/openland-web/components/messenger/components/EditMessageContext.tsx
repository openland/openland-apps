import * as React from 'react';

export interface EditMessageContextProps {
    editMessageId: string | null;
    setEditMessageId: (id: string | null) => void;
}

export const EditMessageContext = React.createContext<EditMessageContextProps>({
    editMessageId: null,
    setEditMessageId: (id: string | null) => {
        return id;
    }
});