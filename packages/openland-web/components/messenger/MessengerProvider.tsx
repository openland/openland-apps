import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { UserShortFragment } from 'openland-api/Types';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { MessengerEngine, MessengerContext, TypingsContext } from 'openland-engines/MessengerEngine';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from '../../../../node_modules/graphql-tag';
import { Observable } from '../../../../node_modules/subscriptions-transport-ws';

let cachedMessenger: MessengerEngine | null = null;

const SUBSCRIBE_TYPINGS = gql`
    subscription SubscribeTypings {
        alphaSubscribeTypings {
            conversation{
                id
            }
            user{
                id
                name
            }
        }
    }
`;

class TypingsProvider extends React.PureComponent<{ apollo: OpenApolloClient, userId: string }, { typings: { [conversationId: string]: { [userId: string]: string | undefined } } }> {
    typings: { [conversationId: string]: { [userId: string]: string | undefined } } = {};
    timeouts: { [conversationId: string]: { [userId: string]: number } } = {};
    sub?: ZenObservable.Subscription = undefined;
    constructor(props: { apollo: OpenApolloClient, userId: string }) {
        super(props);
    }

    componentDidMount() {
        let typingSubscription = this.props.apollo.client.subscribe({
            query: SUBSCRIBE_TYPINGS
        });

        this.sub = typingSubscription.subscribe({
            next: (event) => {
                if (this.props.userId === event.data.alphaSubscribeTypings.user.id) {
                    return;
                }
                console.warn(event.data.alphaSubscribeTypings.user.name, 'typing in ', event.data.alphaSubscribeTypings.conversation.id);
                // add new typings
                let existing = this.typings[event.data.alphaSubscribeTypings.conversation.id] || {};
                existing[event.data.alphaSubscribeTypings.user.id] = event.data.alphaSubscribeTypings.user.name;
                this.typings[event.data.alphaSubscribeTypings.conversation.id] = existing;
                // clear scehduled typing clear
                let existingTimeouts = this.timeouts[event.data.alphaSubscribeTypings.conversation.id] || {};
                clearTimeout(existingTimeouts[event.data.alphaSubscribeTypings.user.id]);
                // schedule typing clear
                existingTimeouts[event.data.alphaSubscribeTypings.user.id] = setTimeout(
                    () => {
                        existing[event.data.alphaSubscribeTypings.user.id] = undefined;
                        this.setState({ typings: { ...this.typings } });
                    },
                    2000);
                this.timeouts[event.data.alphaSubscribeTypings.conversation.id] = existingTimeouts;
                this.setState({ typings: { ...this.typings } });
            }
        });
    }

    componentWillUnmount() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    render() {
        let res: { [conversationId: string]: string | undefined } = {};
        for (let cId of Object.keys(this.typings)) {
            let usersTyping = Object.keys(this.typings[cId]).map(userId => this.typings[cId][userId]).filter(u => u);
            let str = usersTyping.filter((u, i) => i < 2).join(', ') + (usersTyping.length > 2 ? ' and ' + (usersTyping.length - 2) + ' more' : '') + (usersTyping.length === 1 ? ' is ' : ' are ') + 'typing';
            res[cId] = usersTyping.length > 0 ? str : undefined;
        }
        return (
            <TypingsContext.Provider value={res}>
                {this.props.children}
            </TypingsContext.Provider>
        );
    }
}

const Messenger = (props: { currentUser: UserShortFragment, children?: any }) => {
    if (canUseDOM) {
        return (
            <YApolloContext.Consumer>
                {(apollo) => {
                    if (!apollo) {
                        throw Error('Unable to get apollo');
                    }
                    if (!cachedMessenger) {
                        cachedMessenger = new MessengerEngine(apollo, props.currentUser);
                    }
                    return (
                        <MessengerContext.Provider value={cachedMessenger}>
                            <TypingsProvider apollo={apollo} userId={props.currentUser.id}>
                                {props.children}
                            </TypingsProvider>
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
                    {this.props.children}
                </>
            );
        }
    }
}