import * as React from 'react';
import { MessengerEngine, MessengerContext } from './model/MessengerEngine';
import { withApollo } from 'react-apollo';
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

export class MessengerProvider extends React.PureComponent<{ uid?: string }> {
    render() {
        if (this.props.uid) {
            return <Messenger currentUser={this.props.uid}>{this.props.children}</Messenger>;
        } else {
            return <>{this.props.children}</>;
        }
    }
}