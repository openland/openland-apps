import * as React from 'react';
import { withAccountQuery } from './../api';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from 'openland-x-graphql/withData';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import { RootErrorBoundary } from './RootErrorBoundary';

export function withAppBase(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => {
        return (
            <RootErrorBoundary>
                <XRouterProvider routes={Routes}>
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
                </XRouterProvider>
            </RootErrorBoundary>
        );
    }));
}