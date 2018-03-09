import * as React from 'react';
import { withData } from './../utils/withData';
import { withAccountQuery } from './../api';
import { UserInfoProvider } from './UserInfo';
import { AuthenticationRequired } from './AuthenticationRequired';
import { XHead } from './X/XHead';
import { XWithRole } from './X/XWithRole';

export function withApp(role: string, WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        return (
            <>
                <XHead title={['App']} />
                <UserInfoProvider user={props.data.me} router={props.router} roles={props.data.permissions.roles} account={props.data.myAccount}>
                    <AuthenticationRequired>
                        <XWithRole role={role}>
                            <WrappedComponent />
                        </XWithRole>
                    </AuthenticationRequired>
                </UserInfoProvider>
            </>
        );
    }));
};