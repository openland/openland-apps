import * as React from 'react';

interface UnicornContextValue {
    path: string;
    query: any;
    id: string;
}

export const UnicornContext = React.createContext<UnicornContextValue>(undefined as any);