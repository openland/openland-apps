import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { AuthRouter } from '../pages/root/AuthRouter';
import { XShortcutsRoot, XShortcuts } from 'openland-x/XShortcuts';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';

export function withApp(name: string, role: string | string[], WrappedComponent: React.ComponentType<{}>, forceSSR?: boolean) {
    return withAppBase(name, () => {
        let router = React.useContext(XRouterContext)!;

        const handleCtrlOptionN = () => {
            router.push(`/mail/new`);
        };
        return (
            <AuthRouter>
                {(canUseDOM || forceSSR) && (
                    <XWithRole role={role}>
                        <XShortcutsRoot>
                            <XShortcuts
                                handlerMap={{
                                    CTRL_OPTION_N: handleCtrlOptionN,
                                }}
                                keymap={{
                                    CTRL_OPTION_N: {
                                        osx: ['ctrl+option+n'],
                                        windows: ['ctrl+alt+n'],
                                    },
                                }}
                            >
                                {canUseDOM && (
                                    <React.Suspense fallback={<XLoader />} >
                                        <WrappedComponent />
                                    </React.Suspense>
                                )}
                                {!canUseDOM && (
                                    <WrappedComponent />
                                )}
                            </XShortcuts>
                        </XShortcutsRoot>
                    </XWithRole>
                )}
            </AuthRouter>
        );
    });
}
