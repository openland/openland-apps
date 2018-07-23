import { MessengerEngine } from './MessengerEngine';
import { ChatReadMutation, ChatHistoryQuery } from 'openland-api';
import { backoff } from 'openland-x-utils/timer';
import { SequenceWatcher } from './SequenceWatcher';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import { UserShort } from 'openland-api/fragments/UserShort';
import gql from 'graphql-tag';
import { MessageFullFragment } from 'openland-api/Types';
import { ConversationState } from './ConversationState';
import { PendingMessage, isPendingMessage, isServerMessage } from './types';
import { MessageSendHandler } from './MessageSender';

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

export interface ConversationStateHandler {
    onConversationUpdated(state: ConversationState): void;
    onMessageSend(): void;
}

export class ConversationEngine implements MessageSendHandler {
    readonly engine: MessengerEngine;
    readonly conversationId: string;

    private isStarted = false;
    private watcher: SequenceWatcher | null = null;
    private isOpen = false;
    private messages: (MessageFullFragment | PendingMessage)[] = [];
    private state: ConversationState;
    private lastTopMessageRead: string | null = null;
    private listeners: ConversationStateHandler[] = [];

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
                return await this.engine.client.client.query({
                    query: ChatHistoryQuery.document,
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

    // 

    sendMessage = (text: string) => {
        if (text.trim().length > 0) {
            let message = text.trim();
            let date = (new Date().getTime()).toString();
            let key = this.engine.sender.sendMessage(this.conversationId, message, this);
            this.messages = [...this.messages, { date, key, message, progress: 0, file: null, failed: false } as PendingMessage];
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
            for (let l of this.listeners) {
                l.onMessageSend();
            }
        }
    }

    sendFile = (file: UploadCare.File) => {
        let isFirst = true;
        file.progress((v) => {
            if (!isFirst) {
                return;
            }
            isFirst = false;
            let name = v.incompleteFileInfo.name || 'image.jpg';
            let date = (new Date().getTime()).toString();
            let key = this.engine.sender.sendFile(this.conversationId, file, this);
            this.messages = [...this.messages, { date, key, file: name, progress: 0, message: null, failed: false } as PendingMessage];
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
            for (let l of this.listeners) {
                l.onMessageSend();
            }
        });
    }

    retryMessage = (key: string) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === key) {
                    return {
                        ...v,
                        failed: false
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
            this.engine.sender.retryMessage(key, this);
        }
    }

    cancelMessage = (key: string) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.filter((v) => isServerMessage(v) || v.key !== key);
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
        }
    }

    onFailed = (key: string) => {
        // Handle failed
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === key) {
                    return {
                        ...v,
                        failed: true
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
        }
    }

    onCompleted = (key: string) => {
        // Handle completed
        // Dothing: wait for sequence to take care
    }

    onProgress = (key: string, progress: number) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === key) {
                    return {
                        ...v,
                        progress: progress
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
        }
    }

    subscribe = (listener: ConversationStateHandler) => {
        this.listeners.push(listener);
        listener.onConversationUpdated(this.state);
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
            l.onConversationUpdated(this.state);
        }
    }

    private markReadIfNeeded = () => {
        let id: string | null = null;
        for (let i = this.messages.length - 1; i >= 0; i--) {
            let msg = this.messages[i];
            if (!isPendingMessage(msg)) {
                id = msg.id;
                break;
            }
        }
        if (id !== null && id !== this.lastTopMessageRead) {
            this.lastTopMessageRead = id;
            console.warn(id);
            this.engine.client.client.mutate({
                mutation: ChatReadMutation.document,
                variables: {
                    conversationId: this.conversationId,
                    messageId: id
                }
            });
        }
    }

    private updateHandler = async (event: any) => {
        if (event.__typename === 'ConversationEventMessage') {
            // Handle message
            console.info('Received new message');
            // Write message to store
            let data = this.engine.client.client.readQuery({
                query: ChatHistoryQuery.document,
                variables: { conversationId: this.conversationId }
            });
            (data as any).messages.seq = event.seq;
            (data as any).messages.messages = [event.message, ...(data as any).messages.messages];
            this.engine.client.client.writeQuery({
                query: ChatHistoryQuery.document,
                variables: { conversationId: this.conversationId },
                data: data
            });
            if (event.message.repeatKey) {
                // Try to replace message inplace
                let existing = this.messages.findIndex((v) => isPendingMessage(v) && v.key === event.message.repeatKey);
                if (existing >= 0) {
                    let msgs = [...this.messages];
                    msgs[existing] = {
                        ...event.message,
                        date: msgs[existing].date
                    };
                    this.messages = msgs;
                } else {
                    this.messages = [...this.messages.filter((v) => isServerMessage(v) || v.key !== event.message.repeatKey), event.message];
                }
            } else {
                this.messages = [...this.messages, event.message];
            }
            this.state = new ConversationState(false, this.messages);
            this.onMessagesUpdated();
        } else {

            //
            // TODO: Implement correct full chat reload!
            //

            console.warn('Received unknown message');
            // Unknown message: Stop subscription and reload chat
            let loaded = await backoff(() => this.engine.client.client.query({
                query: ChatHistoryQuery.document,
                variables: { conversationId: this.conversationId },
                fetchPolicy: 'network-only'
            }));

            // Reload messages
            // TODO: Preserve pending messages
            this.messages = [...(loaded.data as any).messages.messages];
            this.state = new ConversationState(false, this.messages);

            return (loaded.data as any).messages.seq;
        }
    }
}