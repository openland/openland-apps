import * as React from 'react';
import { XPageTrack } from './XPageTrack';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    let res = (props: any) => {
        return (
            <>
                <XPageTrack name={name} />
                <WrappedComponent />
            </>
        );
    };

    (res as any).displayName = 'AppRoot';
    return res;
}
