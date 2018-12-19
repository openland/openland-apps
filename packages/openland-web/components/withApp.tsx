import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { AuthRouter } from './AuthRouter';
import { XPageTrack } from './XPageTrack';

export function withApp(
    name: string,
    role: string | string[],
    WrappedComponent: React.ComponentType<{}>,
) {
    return withAppBase(name, () => {
        return (
            <>
                <XPageTrack name={name} />
                <AuthRouter>
                    <XWithRole role={role}>
                        <WrappedComponent />
                    </XWithRole>
                </AuthRouter>
            </>
        );
    });
}
