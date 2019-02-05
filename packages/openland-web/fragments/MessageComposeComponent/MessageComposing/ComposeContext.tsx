import * as React from 'react';

type MessageT = string | null | undefined;

export interface ContextT {
    message: MessageT;
}

export const ComposeContext = React.createContext<ContextT>({
    message: undefined,
});

export const ComposeContextProvider = ({ children }: any) => {
    const [message, setMessage] = React.useState<string>('');

    return (
        <ComposeContext.Provider
            value={{
                message,
                setMessage,
            }}
        >
            {children}
        </ComposeContext.Provider>
    );
};
