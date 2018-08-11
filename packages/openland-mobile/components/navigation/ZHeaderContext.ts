import * as React from 'react';
import { ZHeaderConfig } from './ZHeader';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';

export interface ZHeaderContextProvider {
    registerConfig: (config: ZHeaderConfig) => string;
    updateConfig: (key: string, config: ZHeaderConfig) => void;
    removeConfig: (key: string) => void;
}

export const ZHeaderContext = React.createContext<ZHeaderContextProvider | undefined>(undefined);