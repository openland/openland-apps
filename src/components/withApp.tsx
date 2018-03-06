import * as React from 'react';
import { withData } from './../utils/withData';
import { withAccountQuery } from './../api';
import { UserInfoProvider } from './Base/UserInfo';
import { AuthenticationRequired } from './App/AuthenticationRequired';
import { XHead } from './X/XHead';
import { XWithRole } from './X/XWithRole';

export function withApp(role: string, WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        return (
            <UserInfoProvider user={props.data.me} router={props.router} roles={props.data.permissions.roles}>
                <AuthenticationRequired>
                    <XWithRole role={role}>
                        <XHead title={['Openland', 'App']} />
                        <WrappedComponent />
                    </XWithRole>
                </AuthenticationRequired>
            </UserInfoProvider>
        );
    }));
};