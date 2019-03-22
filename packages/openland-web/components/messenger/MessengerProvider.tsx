import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { UserShort } from 'openland-api/Types';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';

let cachedMessenger: MessengerEngine | null = null;

const Messenger = (props: { currentUser: UserShort; children?: any }) => {
    if (canUseDOM) {
        return (
            <YApolloContext.Consumer>
                {apollo => {
                    if (!apollo) {
                        throw Error('Unable to get apollo');
                    }
                    if (!cachedMessenger) {
                        let platform = 'web ' + location.hostname;

                        cachedMessenger = new MessengerEngine(
                            new OpenlandClient(new DirectApollolClient(apollo)),
                            props.currentUser,
                            platform,
                        );
                    }
                    return (
                        <MessengerContext.Provider value={cachedMessenger!}>
                            {props.children}
                        </MessengerContext.Provider>
                    );
                }}
            </YApolloContext.Consumer>
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
