import * as React from 'react';
import { withAccountQuery } from '../api/withAccountQuery';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from './withData';
import { withQueryLoader } from './withQueryLoader';
import { MessengerProvider } from './messenger/MessengerProvider';
import { PushEngineComponent } from './push/PushEngineComponent';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    return withData(name, withAccountQuery(withQueryLoader((props) => {
        let hasMessenger = !!props.data.me;
        return (
            <>
                <PushEngineComponent enable={hasMessenger} />
                <XDocumentHead title={['App']} />
                <UserInfoProvider
                    router={props.router}
                    sessionState={props.data.sessionState}
                    user={props.data.me}
                    organization={props.data.me && props.data.me.primaryOrganization}
                    roles={props.data.myPermissions.roles}
                >
                    <MessengerProvider user={hasMessenger ? props.data.me!! : undefined}>
                        <WrappedComponent />
                    </MessengerProvider>
                </UserInfoProvider>
            </>
        );
    })));
}