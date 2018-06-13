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