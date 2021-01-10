import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { UserShort } from 'openland-api/spacex.types';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';

let cachedMessenger: MessengerEngine | null = null;

const Messenger = (props: { currentUser: UserShort; children?: any }) => {
    if (canUseDOM) {
        let client = useClient();
        let permissions = React.useContext(XRoleContext);
        if (!cachedMessenger) {
            let platform = 'web ' + location.hostname;
            cachedMessenger = new MessengerEngine(client, props.currentUser, platform, {
                conversationBatchSize: 30,
                experimental: permissions && permissions.roles.indexOf('super-admin') >= 0
            });
        }
        return (
            <MessengerContext.Provider value={cachedMessenger!}>
                {props.children}
            </MessengerContext.Provider>
        );
    } else {
        return <>{props.children}</>;
    }
};

export class MessengerProvider extends React.PureComponent<{
    user?: UserShort;
}> {
    render() {
        if (this.props.user) {
            return <Messenger currentUser={this.props.user}>{this.props.children}</Messenger>;
        } else {
            return <>{this.props.children}</>;
        }
    }
}
