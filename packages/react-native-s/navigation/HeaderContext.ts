import * as React from 'react';
import { HeaderConfig } from './HeaderConfig';

export interface HeaderContextProvider {
    registerConfig: (config: HeaderConfig, animated?: boolean) => string;
    updateConfig: (key: string, config: HeaderConfig, animated?: boolean) => void;
    removeConfig: (key: string, animated?: boolean) => void;
}

export const HeaderContext = React.createContext<HeaderContextProvider | undefined>(undefined);