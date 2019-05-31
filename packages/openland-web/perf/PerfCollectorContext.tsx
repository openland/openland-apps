import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import UUID from 'uuid/v4';

let map = {};
let cachedChatsIds: string[] = [];
let measureId = UUID();

export const defaultPerfCollectorContextValue = {
    measureFromServer:
        canUseDOM && (window as any).perfMeasure ? JSON.parse((window as any).perfMeasure!!) : null,
    setMap: (newMap: any) => {
        map = newMap;
        measureId = UUID();
    },
    getMap: () => map,
    setCachedChatsIds: (newCachedChatsIds: any) => (cachedChatsIds = newCachedChatsIds),
    getCachedChatsIds: () => cachedChatsIds,
    getMeasureId: () => measureId,
};

export const PerfCollectorContext = React.createContext<{
    measureFromServer: any;
    setMap: Function;
    setCachedChatsIds: Function;
    getCachedChatsIds: Function;
    getMap: Function;
    getMeasureId: Function;
}>(defaultPerfCollectorContextValue);
