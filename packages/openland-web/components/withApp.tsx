import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { AuthRouter } from '../pages/root/AuthRouter';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';
import {
    PerfCollectorContext,
    defaultPerfCollectorContextValue,
} from 'openland-web/perf/PerfCollectorContext';

export function withApp(
    name: string,
    role: string | string[],
    WrappedComponent: React.ComponentType<{}>,
    forceSSR?: boolean,
) {
    return withAppBase(name, () => {
        return (
            <PerfCollectorContext.Provider value={defaultPerfCollectorContextValue}>
                <ClientCacheProvider>
                    <AuthRouter>
                        {(canUseDOM || forceSSR) && (
                            <XWithRole role={role}>
                                {canUseDOM && (
                                    <React.Suspense fallback={<XLoader loading={true} />}>
                                        <WrappedComponent />
                                    </React.Suspense>
                                )}
                                {!canUseDOM && <WrappedComponent />}
                            </XWithRole>
                        )}
                    </AuthRouter>
                </ClientCacheProvider>
            </PerfCollectorContext.Provider>
        );
    });
}
