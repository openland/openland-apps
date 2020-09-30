import * as React from 'react';

export interface XModalBoxContextValue {
    close: () => void;
    fullScreen: boolean;
}

export const XModalBoxContext = React.createContext<XModalBoxContextValue | undefined>(undefined);
