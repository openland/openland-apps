import * as React from 'react';
import { MessengerEngine, MessengerContext } from './model/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { UserShortFragment } from 'openland-api/Types';
import { ServiceWorkerCleaner } from './model/worker/ServiceWorkerCleaner';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';

let cachedMessenger: MessengerEngine | null = null;

const Messenger = (props: { currentUser: UserShortFragment, children?: any }) => {
    if (canUseDOM) {
        return (
            <YApolloContext.Consumer>
                {(apollo) => {
                    if (!apollo) {
                        throw Error('Unable to get apollo');
                    }
                    if (!cachedMessenger) {
                        cachedMessenger = new MessengerEngine(apollo.client, props.currentUser);
                    }
                    return (
                        <MessengerContext.Provider value={cachedMessenger}>
                            {props.children}
                        </MessengerContext.Provider>
                    );
                }}
            </YApolloContext.Consumer>
        );
    } else {
        return (
            <>
                {props.children}
            </>
        );
    }
};

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