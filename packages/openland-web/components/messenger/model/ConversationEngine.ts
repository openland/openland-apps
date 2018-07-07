import { MessengerEngine } from './MessengerEngine';
import { ChatQuery, ChatReadMutation } from 'openland-api';
import { backoff } from 'openland-x-utils/timer';
import { SequenceWatcher } from './SequenceWatcher';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import { UserShort } from 'openland-api/fragments/UserShort';
import gql from 'graphql-tag';
import { MessageFullFragment } from 'openland-api/Types';
import { ConversationState } from './ConversationState';

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

export class ConversationEngine {
    readonly engine: MessengerEngine;
    readonly conversationId: string;

    private isStarted = false;
    private watcher: SequenceWatcher | null = null;
    private isOpen = false;
    private messages: MessageFullFragment[] = [];
    private state: ConversationState;
    private lastTopMessageRead: string | null = null;
    private listeners: ((state: ConversationState) => void)[] = [];

    constructor(engine: MessengerEngine, conversationId: string) {
        this.engine = engine;
        this.conversationId = conversationId;
        this.state = new ConversationState(true, []);
    }

    start = async () => {
        if (this.isStarted) {
            throw Error('ConversationEngine already started!');
        }
        this.isStarted = true;
        console.info('Loading initial state for ' + this.conversationId);
        let initialChat = await backoff(async () => {
            try {
                return await this.engine.client.query({
                    query: ChatQuery.document,
                    variables: {
                        conversationId: this.conversationId
                    }
                });
            } catch (e) {
                console.warn(e);
                throw e;
            }
        });
        if (!this.isStarted) {
            return;
        }
        this.messages = [...(initialChat.data as any).messages.messages];
        this.messages.reverse();
        this.state = new ConversationState(false, this.messages);
        let seq = (initialChat.data as any).messages.seq as number;
        console.info('Initial state for ' + this.conversationId + ' loaded with seq #' + seq);
        this.watcher = new SequenceWatcher('chat:' + this.conversationId, CHAT_SUBSCRIPTION, seq, { conversationId: this.conversationId }, this.updateHandler, this.engine.client);
        this.onMessagesUpdated();
    }

    onOpen = () => {
        this.isOpen = true;
        this.markReadIfNeeded();
    }

    onClosed = () => {
        this.isOpen = false;
    }

    getState = () => {
        return this.state;
    }

    subscribe = (listener: (state: ConversationState) => void) => {
        this.listeners.push(listener);
        listener(this.state);
        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    }

    destroy = () => {
        if (!this.isStarted) {
            throw Error('ConversationEngine not started!');
        }
        this.isStarted = false;
        if (this.watcher) {
            this.watcher!!.destroy();
        }
    }

    private onMessagesUpdated = () => {
        console.warn('Messages updated');
        if (this.isOpen) {
            this.markReadIfNeeded();
        }
        for (let l of this.listeners) {
            l(this.state);
        }
    }

    private markReadIfNeeded = () => {
        if (this.messages.length > 0) {
            let id = this.messages[this.messages.length - 1].id;
            if (id !== this.lastTopMessageRead) {
                this.lastTopMessageRead = id;
                this.engine.client.mutate({
                    mutation: ChatReadMutation.document,
                    variables: {
                        conversationId: this.conversationId,
                        messageId: this.messages[this.messages.length - 1].id
                    }
                });
            }
        }
    }

    private updateHandler = async (event: any) => {
        if (event.__typename === 'ConversationEventMessage') {
            // Handle message
            console.info('Received new message');
            // Write message to store
            let data = this.engine.client.readQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.conversationId }
            });
            (data as any).messages.seq = event.seq;
            (data as any).messages.messages = [event.message, ...(data as any).messages.messages];
            this.engine.client.writeQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.conversationId },
                data: data
            });
            this.messages = [...this.messages, event.message];
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
        } else {

            //
            // TODO: Implement correct full chat reload!
            //

            console.warn('Received unknown message');
            // Unknown message: Stop subscription and reload chat
            let loaded = await backoff(() => this.engine.client.query({
                query: ChatQuery.document,
                variables: { conversationId: this.conversationId },
                fetchPolicy: 'network-only'
            }));

            // Reload messages
            this.messages = [...(loaded.data as any).messages.messages];
            this.state = new ConversationState(false, this.messages);

            return (loaded.data as any).messages.seq;
        }
    }
}