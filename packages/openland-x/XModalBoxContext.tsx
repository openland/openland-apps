import * as React from 'react';

export interface XModalBoxContextValue {
    close: () => void;
}

export const XModalBoxContext = React.createContext<XModalBoxContextValue | undefined>(undefined);
