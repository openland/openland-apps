import * as React from 'react';
import gql from 'graphql-tag';
import { UserShort } from 'openland-api/fragments/UserShort';
import { ApolloClient } from 'apollo-client';
import { ConnectionStatus } from 'openland-x-graphql/apolloClient';
import { ChatQuery } from 'openland-api/ChatQuery';
import { backoff } from 'openland-x-utils/timer';

const CHAT_SUBSCRIPTION = gql`
  subscription ChatSubscription($conversationId: ID!, $seq: Int!) {
    event: alphaChatSubscribe(conversationId: $conversationId, fromSeq: $seq) {
      seq
      ... on ConversationEventMessage {
        message {
            id
            message
            sender {
                ...UserShort
            }
            date
        }
      }
    }
  }
  ${UserShort}
`;

export  interface MessengerWatcherProps {
    conversationId: string;
    seq: number;
    client: ApolloClient<{}>;
    uid: string;
}

export class MessengerWatcher extends React.Component<MessengerWatcherProps> {

    currentSeq: number;
    observable: ZenObservable.Subscription | null = null;
    _mounted = false;
    connectionStatusUnsubscribe: (() => void) | null = null;
    doingFullRefresh: boolean = false;
    pending: any[] = [];
    pendingTimeout: number | null = null;

    constructor(props: MessengerWatcherProps) {
        super(props);
        this.currentSeq = props.seq;
    }

    handleNewMessage = () => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
    }

    componentDidMount() {
        this._mounted = true;
        this.startSubsctiption();
        this.connectionStatusUnsubscribe = ConnectionStatus.subscribe(this.handleConnectionChanged);
    }
    componentWillUnmount() {
        this._mounted = false;
        this.connectionStatusUnsubscribe!!();
        this.stopSubscription();
    }

    startSubsctiption = () => {
        if (!this._mounted) {
            return;
        }
        if (!ConnectionStatus.isConnected) {
            return;
        }
        this.stopSubscription();
        console.warn('Start Subscription starting from #' + this.currentSeq);
        let subscription = this.props.client.subscribe({
            query: CHAT_SUBSCRIPTION,
            variables: { conversationId: this.props.conversationId, seq: this.currentSeq }
        });
        this.observable = subscription.subscribe({
            error: this.handleError,
            next: this.handleUpdate
        });
    }

    stopSubscription = () => {
        if (this.observable) {
            console.warn('Stopping Subscription');
            try {
                this.observable.unsubscribe();
            } catch (e) {
                // Ignore exception since this method will throw if connection already closed
            }
            this.observable = null;
        }
    }

    handleConnectionChanged = (isConnected: boolean) => {
        if (!this._mounted) {
            return;
        }
        if (isConnected) {
            if (!this.observable && !this.doingFullRefresh) {
                this.startSubsctiption();
            }
        } else {
            this.stopSubscription();
        }
    }

    handleError = (e: any) => {
        if (!this._mounted) {
            return;
        }
        console.warn(e);
        this.startSubsctiption();
    }

    tryFlushPending = (timeouted: boolean) => {
        if (this.pending.length > 0) {
            for (let update of this.pending) {
                let event = update.data.event;
                let seq = event.seq as number;
                if (seq === this.currentSeq + 1) {
                    // Our current update
                    let index = this.pending.indexOf(update);
                    this.pending = this.pending.splice(index, 1);
                    console.warn('Replay: ' + seq);
                    this.handleUpdate(update);
                    return;
                } else if (seq <= this.currentSeq) {
                    // Too old remove
                    let index = this.pending.indexOf(update);
                    this.pending = this.pending.splice(index, 1);
                }
            }

            if (timeouted && this.pending.length > 0) {
                // Reset pending storage in case if there will be some garbage events
                this.pending = [];
                // Subscription restart if updates not found
                if (timeouted && this._mounted && !this.doingFullRefresh) {
                    this.startSubsctiption();
                }
            }
        }
    }

    handleUpdate = (update: any) => {
        console.warn(update);
        if (!this._mounted) {
            return;
        }
        let event = update.data.event;
        let seq = event.seq as number;

        // Too old
        if (seq <= this.currentSeq) {
            console.warn('Too old seq #' + seq);
            return;
        }

        // Too new: invalidate
        if (seq > this.currentSeq + 1) {
            console.warn('Too new seq: ' + seq);

            // Too large
            if (seq > this.currentSeq + 2) {
                this.startSubsctiption();
            } else {
                this.pending.push(update);
                if (!this.pendingTimeout) {
                    this.pendingTimeout = window.setTimeout(
                        () => {
                            this.pendingTimeout = null;
                            this.tryFlushPending(true);
                        },
                        3000);
                }

            }
            return;
        }

        // Reset Pending Flush
        if (this.pendingTimeout) {
            window.clearTimeout(this.pendingTimeout);
            this.pendingTimeout = null;
        }

        console.warn('Next update #' + seq);

        if (event.__typename === 'ConversationEventMessage') {
            // Handle message
            console.warn('Received new message');
            let senderId = event.message.sender.id as string;
            if (senderId !== this.props.uid) {
                this.handleNewMessage();
            }

            // Update sequence number
            this.currentSeq = seq;

            // Write message to store
            let data = this.props.client.readQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId }
            });
            (data as any).messages.seq = seq;
            (data as any).messages.messages = [event.message, ...(data as any).messages.messages];
            this.props.client.writeQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId },
                data: data
            });
            this.tryFlushPending(false);
        } else {
            console.warn('Received unknown message');
            // Unknown message: Stop subscription and reload chat
            this.doingFullRefresh = true;
            this.stopSubscription();
            (async () => {
                let loaded = await backoff(() => this.props.client.query({
                    query: ChatQuery.document,
                    variables: { conversationId: this.props.conversationId },
                    fetchPolicy: 'network-only'
                }));
                if (!this._mounted) {
                    return;
                }
                this.currentSeq = (loaded.data as any).messages.seq;
                this.doingFullRefresh = false;
                this.tryFlushPending(false);
                this.startSubsctiption();
            })();
        }
    }

    render() {
        return null;
    }
}
