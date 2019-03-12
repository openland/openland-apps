import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/components/messenger/MessengerProvider';
import { XLoader } from 'openland-x/XLoader';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { PushEngineComponent } from 'openland-web/modules/push/PushEngineComponent';
import { withAccountQuery } from 'openland-web/api/withAccountQuery';

export const AppContainer = withAccountQuery(props => {
    if (props.loading) {
        return (
            <>
                <XDocumentHead title={[]} />
                <XLoader loading={true} />
            </>
        );
    }

    let hasMessenger = canUseDOM && !!props.data.me;
    return (
        <>
            <PushEngineComponent enable={hasMessenger} />
            <XDocumentHead title={[]} />
            <UserInfoProvider
                sessionState={props.data.sessionState}
                user={props.data.me}
                organization={props.data.me && props.data.me.primaryOrganization}
                roles={props.data.myPermissions.roles}
            >
                <MessengerProvider user={hasMessenger ? props.data.me!! : undefined}>
                    {props.children}
                </MessengerProvider>
            </UserInfoProvider>
        </>
    );
});

AppContainer.displayName = 'AppContainer';
