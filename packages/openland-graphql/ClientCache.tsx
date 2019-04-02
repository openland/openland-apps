import * as React from 'react';
import { GraphqlQueryWatch } from './GraphqlClient';
import { randomKey } from './utils/randomKey';

export class ClientCache {
    readonly key: string = randomKey();
    queries = new Map<String, GraphqlQueryWatch<{}>>();

    cleanup = () => {
        for (let k of this.queries.keys()) {
            this.queries.get(k)!.destroy();
        }
        this.queries.clear();
    }
}

export const ClientCacheContext = React.createContext<ClientCache | undefined>(undefined);

export const ClientCacheProvider = (props: { children: any }) => {
    const cache = React.useMemo(() => new ClientCache(), []);
    React.useEffect(() => { return () => cache.cleanup() }, []);

    return (
        <ClientCacheContext.Provider value={cache}>
            {props.children}
        </ClientCacheContext.Provider>
    );
};