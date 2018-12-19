import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { AuthRouter } from './AuthRouter';

export function withApp(
    name: string,
    role: string | string[],
    WrappedComponent: React.ComponentType<{}>,
) {
    return withAppBase(name, () => {
        return (
            <AuthRouter>
                <XWithRole role={role}>
                    <WrappedComponent />
                </XWithRole>
            </AuthRouter>
        );
    });
}
