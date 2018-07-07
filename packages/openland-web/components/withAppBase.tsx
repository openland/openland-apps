import * as React from 'react';
import { withAccountQuery } from '../api/withAccountQuery';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from './withData';
import { withQueryLoader } from './withQueryLoader';
import { MessengerProvider } from './messenger/MessengerProvider';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    return withData(name, withAccountQuery(withQueryLoader((props) => {
        let hasMessenger = props.data.permissions.roles.indexOf('feature-messaging') >= 0 && props.data.me;
        return (
            <>
                <XDocumentHead title={['App']} />
                <UserInfoProvider
                    router={props.router}
                    sessionState={props.data.sessionState}
                    user={props.data.me}
                    organization={props.data.organization}
                    roles={props.data.permissions.roles}
                >
                    <MessengerProvider user={hasMessenger ? props.data.me!! : undefined}>
                        <WrappedComponent />
                    </MessengerProvider>
                </UserInfoProvider>
            </>
        );
    })));
}