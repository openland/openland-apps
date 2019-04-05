import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { UserShort } from 'openland-api/Types';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';

let cachedMessenger: MessengerEngine | null = null;

const Messenger = (props: { currentUser: UserShort; children?: any }) => {
    if (canUseDOM) {
        let client = useClient();
        if (!cachedMessenger) {
            let platform = 'web ' + location.hostname;
            cachedMessenger = new MessengerEngine(client, props.currentUser, platform);
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
