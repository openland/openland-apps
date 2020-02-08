import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { AuthRouter } from '../pages/root/AuthRouter';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { UnicornSplash } from 'openland-x/XLoader';
import { QueryCacheProvider } from '@openland/spacex';

export function withApp(
    name: string,
    role: string | string[],
    WrappedComponent: React.ComponentType<{}>,
    forceSSR?: boolean,
) {
    return withAppBase(name, () => {
        return (
            <QueryCacheProvider>
                <AuthRouter>
                    {(canUseDOM || forceSSR) && (
                        <XWithRole role={role}>
                            {canUseDOM && (
                                <React.Suspense fallback={<UnicornSplash />}>
                                    <WrappedComponent />
                                </React.Suspense>
                            )}
                            {!canUseDOM && <WrappedComponent />}
                        </XWithRole>
                    )}
                </AuthRouter>
            </QueryCacheProvider>
        );
    });
}
