import * as React from 'react';
import { withAccountQuery } from './../api';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from './withData';

export function withAppBase(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        return (
            <>
                <XDocumentHead title={['App']} />
                <UserInfoProvider
                    router={props.router}
                    user={props.data.me}
                    roles={props.data.permissions.roles}
                    sessionState={props.data.sessionState}
                    account={props.data.myAccount}
                >
                    <WrappedComponent />
                </UserInfoProvider>
            </>
        );
    }));
}