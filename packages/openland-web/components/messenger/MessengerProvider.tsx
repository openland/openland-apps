import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { UserShort } from 'openland-api/Types';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';

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
                        cachedMessenger = new MessengerEngine(apollo, props.currentUser);
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
