import * as React from 'react';
import gql from 'graphql-tag';
import { UserShort } from 'openland-api/fragments/UserShort';
import { ApolloClient } from 'apollo-client';
import { ChatQuery } from 'openland-api/ChatQuery';
import { backoff } from 'openland-x-utils/timer';
import { SequenceWatcher } from './SequenceWatcher';
import { MessageFull } from 'openland-api/fragments/MessageFull';

const CHAT_SUBSCRIPTION = gql`
  subscription ChatSubscription($conversationId: ID!, $seq: Int!) {
    event: alphaChatSubscribe(conversationId: $conversationId, fromSeq: $seq) {
      seq
      ... on ConversationEventMessage {
        message {
            ...MessageFull
        }
      }
    }
  }
  ${MessageFull}
  ${UserShort}
`;

export interface MessengerWatcherProps {
    conversationId: string;
    seq: number;
    client: ApolloClient<{}>;
    uid: string;
}

export class MessengerWatcher extends React.Component<MessengerWatcherProps> {
    watcher: SequenceWatcher | null = null;
    componentDidMount() {
        this.watcher = new SequenceWatcher('chat:' + this.props.conversationId, CHAT_SUBSCRIPTION, this.props.seq, { conversationId: this.props.conversationId }, this.updateHandler, this.props.client);
    }

    updateHandler = async (event: any) => {
        if (event.__typename === 'ConversationEventMessage') {
            // Handle message
            console.info('Received new message');
            // let senderId = event.message.sender.id as string;
            // if (senderId !== this.props.uid) {
            //     this.handleNewMessage();
            // }
            // Write message to store
            let data = this.props.client.readQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId }
            });
            (data as any).messages.seq = event.seq;
            (data as any).messages.messages = [event.message, ...(data as any).messages.messages];
            this.props.client.writeQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId },
                data: data
            });
        } else {
            console.warn('Received unknown message');
            // Unknown message: Stop subscription and reload chat
            let loaded = await backoff(() => this.props.client.query({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId },
                fetchPolicy: 'network-only'
            }));
            return (loaded.data as any).messages.seq;
        }
    }

    componentWillUnmount() {
        if (this.watcher) {
            this.watcher!!.destroy();
            this.watcher = null;
        }
    }

    render() {
        return null;
    }
}
