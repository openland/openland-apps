import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/components/messenger/MessengerProvider';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { PushEngineComponent } from 'openland-web/modules/push/PushEngineComponent';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';

export const AppContainer = (props: { children: any }) => {
    console.log('AppContainer');
    const client = useClient();

    const data = client.useWithoutLoaderAccount();

    if (!data) {
        return <XLoader loading={true} />;
    }

    let hasMessenger = canUseDOM && !!data.me;
    return (
        <>
            <PushEngineComponent enable={hasMessenger} />
            <XDocumentHead title={[]} />
            <UserInfoProvider
                sessionState={data.sessionState}
                user={data.me}
                organization={data.me && data.me.primaryOrganization}
                roles={data.myPermissions.roles}
            >
                <MessengerProvider user={hasMessenger ? data.me!! : undefined}>
                    {props.children}
                </MessengerProvider>
            </UserInfoProvider>
        </>
    );
};

AppContainer.displayName = 'AppContainer';
