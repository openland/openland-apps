import * as React from 'react';
import { withAccountQuery } from './../api/withAccountQuery';
import { UserInfoProvider } from './UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withData } from './withData';
import { withQueryLoader } from './withQueryLoader';
import { withApollo } from 'react-apollo';
import { MessengerEngine, MessengerContext } from './messenger/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

let cachedMessenger: MessengerEngine | null = null;

const Messenger = withApollo<{ currentUser: string }>((props) => {
    if (!cachedMessenger && canUseDOM) {
        cachedMessenger = new MessengerEngine(props.client);
    }
    if (cachedMessenger) {
        return (
            <MessengerContext.Provider value={cachedMessenger}>
                {props.children}
            </MessengerContext.Provider>
        );
    }
    return (
        <>
            {props.children}
        </>
    );
});

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
                    {hasMessenger && <Messenger currentUser={props.data.me!!.id}><WrappedComponent /></Messenger>}
                    {!hasMessenger && <WrappedComponent />}
                </UserInfoProvider>
            </>
        );
    })));
}