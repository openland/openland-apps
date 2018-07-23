import * as React from 'react';
import { MessengerEngine, MessengerContext } from './model/MessengerEngine';
import { withApollo } from 'react-apollo';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { UserShortFragment } from 'openland-api/Types';
import { ServiceWorkerCleaner } from './model/worker/ServiceWorkerCleaner';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let cachedMessenger: MessengerEngine | null = null;

const Messenger = withApollo<{ currentUser: UserShortFragment }>((props) => {
    if (!cachedMessenger && canUseDOM) {
        cachedMessenger = new MessengerEngine(props.client, props.currentUser);
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

export class MessengerProvider extends React.PureComponent<{ user?: UserShortFragment }> {
    render() {
        if (this.props.user) {
            return <Messenger currentUser={this.props.user}>{this.props.children}</Messenger>;
        } else {
            return (
                <>
                    <ServiceWorkerCleaner />
                    {this.props.children}
                </>
            );
        }
    }
}