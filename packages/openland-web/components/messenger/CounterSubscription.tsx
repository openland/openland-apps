import * as React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { SequenceWatcher } from './SequenceWatcher';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';

// let COUNTER_SUBSCRIPTION = gql`
//     subscription CounterSubscription {
//         counter: alphaNotificationCounterSubscribe {
//             id
//             unreadCount
//         }
//     }
// `;

let GLOBAL_SUBSCRIPTION = gql`
    subscription GlobalSubscription {
        event: alphaSubscribeEvents {
            seq
            ... on UserEventMessage {
                unread
                globalUnread
                conversationId
            }
            ... on UserEventRead {
                unread
                globalUnread
                conversationId
            }
        }
    }
`;

export const CounterSubscriptions = withApollo<{}>(class CounterSubscriptionsComponent extends React.PureComponent<{ client: ApolloClient<{}> }> {

    private watcher: SequenceWatcher | null = null;

    componentDidMount() {
        this.watcher = new SequenceWatcher('global:counter', GLOBAL_SUBSCRIPTION, null, {}, this.handleEvent, this.props.client);
    }

    writeGlobalCounter = (counter: number) => {
        let existing = this.props.client.readQuery({
            query: GlobalCounterQuery.document
        });
        if (existing) {
            (existing as any).counter.unreadCount = counter;
            this.props.client.writeQuery({
                query: GlobalCounterQuery.document,
                data: existing
            });
        }
    }

    handleNewMessage = () => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
    }

    handleEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            this.writeGlobalCounter(event.globalUnread);
            this.handleNewMessage();
        } else if (event.__typename === 'UserEventRead') {
            this.writeGlobalCounter(event.globalUnread);
        }
    }

    componentWillUnmount() {
        if (this.watcher) {
            this.watcher.destroy();
            this.watcher = null;
        }
    }

    render() {
        return null;
    }
});