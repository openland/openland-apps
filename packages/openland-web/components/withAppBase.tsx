import * as React from 'react';
import { XPageTrack } from './XPageTrack';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    return (props: any) => {
        return (
            <>
                <XPageTrack name={name} />
                <WrappedComponent />
            </>
        );
    };
}
