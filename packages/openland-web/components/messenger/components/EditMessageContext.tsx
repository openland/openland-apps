import * as React from 'react';

export interface EditMessageContextProps {
    editMessageId: string | null;
    editMessage: string | null;
    setEditMessage: (id: string | null, message: string | null) => void;
}

export const EditMessageContext = React.createContext<EditMessageContextProps>({
    editMessageId: null,
    editMessage: null,
    setEditMessage: (id: string | null, message: string | null) => {
        return {id: id, message: message};
    }
});