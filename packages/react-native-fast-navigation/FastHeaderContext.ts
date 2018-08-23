import * as React from 'react';
import { FastHeaderConfig } from './FastHeaderConfig';

export interface FastHeaderContextProvider {
    registerConfig: (config: FastHeaderConfig) => string;
    updateConfig: (key: string, config: FastHeaderConfig) => void;
    removeConfig: (key: string) => void;
}

export const FastHeaderContext = React.createContext<FastHeaderContextProvider | undefined>(undefined);