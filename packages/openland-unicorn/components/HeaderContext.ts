import * as React from 'react';
import { HeaderConfig } from './HeaderConfig';

export interface HeaderContextProvider {
    registerConfig: (config: HeaderConfig) => string;
    updateConfig: (key: string, config: HeaderConfig) => void;
    removeConfig: (key: string) => void;
}

export const HeaderContext = React.createContext<HeaderContextProvider | undefined>(undefined);