import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { AuthRouter } from './AuthRouter';
import { XShortcutsRoot, XShortcuts } from 'openland-x/XShortcuts';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

export function withApp(
    name: string,
    role: string | string[],
    WrappedComponent: React.ComponentType<{}>,
) {
    return withAppBase(name, () => {
        let router = React.useContext(XRouterContext)!;

        const handleCtrlOptionN = () => {
            router.push(`/mail/new`);
        };
        return (
            <AuthRouter>
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
                            <WrappedComponent />
                        </XShortcuts>
                    </XShortcutsRoot>
                </XWithRole>
            </AuthRouter>
        );
    });
}
