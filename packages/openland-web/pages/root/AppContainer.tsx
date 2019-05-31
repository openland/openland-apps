import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/components/messenger/MessengerProvider';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { PushEngineComponent } from 'openland-web/modules/push/PushEngineComponent';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { XDialogProviderComponent } from 'openland-x/XDialogProvider';
import { XShortcutsRoot, XShortcuts } from 'openland-x/XShortcuts';
import { XRoutingContext } from 'openland-x-routing/XRoutingContext';

export const AppContainer = (props: { children: any }) => {
    let router = React.useContext(XRoutingContext)!;

    const client = useClient();

    const data = client.useWithoutLoaderAccount();

    if (!data) {
        return <XLoader loading={true} />;
    }

    const handleCtrlOptionN = () => {
        router.push(`/mail/new`);
    };
    let hasMessenger = canUseDOM && !!data.me;
    return (
        <>
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
                    <PushEngineComponent enable={hasMessenger} />
                    <XDocumentHead title={[]} />
                    <UserInfoProvider
                        sessionState={data.sessionState}
                        user={data.me}
                        organization={data.me && data.me.primaryOrganization}
                        roles={data.myPermissions.roles}
                    >
                        <MessengerProvider user={hasMessenger ? data.me!! : undefined}>
                            <XDialogProviderComponent />
                            {props.children}
                        </MessengerProvider>
                    </UserInfoProvider>
                </XShortcuts>
            </XShortcutsRoot>
        </>
    );
};

AppContainer.displayName = 'AppContainer';
