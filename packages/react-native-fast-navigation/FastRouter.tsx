import * as React from 'react';
import { FastHeaderConfig } from './FastHeaderConfig';

export const FastRouterContext = React.createContext<FastRouter | undefined>(undefined);

export interface FastRouter {
    route: string;
    index: number;
    key: string;
    params: any;
    updateConfig: (config: FastHeaderConfig) => void;
    push: (route: string, params?: any) => void;
    back: () => void;
}