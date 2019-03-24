import * as React from 'react';
import { XRouterContext } from './XRouterContext';

export function useXRouter() {
    const res = React.useContext(XRouterContext)!;
    if (!res) {
        throw Error('Router not configured!');
    }
    return res;
}