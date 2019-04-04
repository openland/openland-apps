import * as React from 'react';
import { XPageTrack } from './XPageTrack';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    let res = (props: any) => {
        return (
            <>
                <XPageTrack name={name} />
                <ClientCacheProvider>
                    <WrappedComponent />
                </ClientCacheProvider>
            </>
        );
    };

    (res as any).displayName = 'AppRoot';
    return res;
}
