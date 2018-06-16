import * as React from 'react';
import { withAccountQuery } from './../api/withAccountQuery';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from './withData';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    return withData(name, withAccountQuery((props) => {
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
                    <WrappedComponent />
                </UserInfoProvider>
            </>
        );
    }));
}