import * as React from 'react';
import { withAccountQuery } from './../api';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from './withData';

export function withAppBase(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        console.warn(props);
        return (
            <>
                <XDocumentHead title={['App']} />
                <UserInfoProvider
                    user={props.data.me}
                    router={props.router}
                    roles={props.data.permissions.roles}
                    account={props.data.myAccount}
                    profile={props.data.myProfile}
                >
                    <WrappedComponent />
                </UserInfoProvider>
            </>
        );
    }));
}