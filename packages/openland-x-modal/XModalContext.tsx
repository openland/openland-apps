import * as React from 'react';

export interface XModalContextValue {
    close: () => void;
}

export const XModalContext = React.createContext<XModalContextValue | undefined>(undefined);