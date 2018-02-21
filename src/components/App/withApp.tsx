import * as React from 'react';
import { withData } from '../../utils/withData';
import { withAccountQuery } from '../../api';
import { UserInfoProvider } from '../Base/UserInfo';
import { AuthenticationRequired } from './AuthenticationRequired';
import { XHead } from '../X/XHead';

export function withApp(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        return (
            <UserInfoProvider user={props.data.me} router={props.router}>
                <AuthenticationRequired>
                    <XHead title={['Statecraft', 'App']} />
                    <WrappedComponent />
                </AuthenticationRequired>
            </UserInfoProvider>
        );
    }));
};