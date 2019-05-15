import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

let map = {};
let cachedChatsIds: string[] = [];

export const defaultPerfCollectorContextValue = {
    measureFromServer:
        canUseDOM && (window as any).perfMeasure ? JSON.parse((window as any).perfMeasure!!) : null,
    setMap: (newMap: any) => (map = newMap),
    getMap: () => map,
    setCachedChatsIds: (newCachedChatsIds: any) => (cachedChatsIds = newCachedChatsIds),
    getCachedChatsIds: () => cachedChatsIds,
};

export const PerfCollectorContext = React.createContext<{
    measureFromServer: any;
    setMap: Function;
    setCachedChatsIds: Function;
    getCachedChatsIds: Function;
    getMap: Function;
}>(defaultPerfCollectorContextValue);
