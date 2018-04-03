import * as React from 'react';
import { withData } from './../utils/withData';
import { withAccountQuery } from './../api';
import { UserInfoProvider } from './UserInfo';
import { XHead } from './X/XHead';

export function withAppBase(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        return (
            <>
                <XHead title={['App']} />
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