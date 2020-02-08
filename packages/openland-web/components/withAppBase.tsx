import * as React from 'react';
import { XPageTrack } from './XPageTrack';
import { QueryCacheProvider } from '@openland/spacex';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    let res = (props: any) => {
        return (
            <>
                <XPageTrack name={name} />
                <QueryCacheProvider>
                    <WrappedComponent />
                </QueryCacheProvider>
            </>
        );
    };

    (res as any).displayName = 'AppRoot';
    return res;
}
