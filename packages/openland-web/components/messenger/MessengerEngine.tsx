import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { SequenceWatcher } from './SequenceWatcher';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { backoff } from 'openland-x-utils/timer';
// import * as ifvisible from 'ifvisible.js';

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

let SHARED_CONVERSATION_COUNTER = gql`
    fragment SharedConversationCounter on SharedConversation {
        id
        unreadCount
    }
`;

let PRIVATE_CONVERSATION_COUNTER = gql`
    fragment PrivateConversationCounter on PrivateConversation {
        id
        unreadCount
    }
`;

export class MessengerEngine {
    readonly client: ApolloClient<{}>;
    private readonly globalWatcher: SequenceWatcher;
    private openedConversations = new Map<string, { count: number, unread: number }>();
    private isVisible = true;

    constructor(client: ApolloClient<{}>) {
        this.client = client;
        this.globalWatcher = new SequenceWatcher(GLOBAL_SUBSCRIPTION, null, {}, this.handleGlobalEvent, this.client);
        backoff(() => import('ifvisible.js')).then((v) => {
            v.on('idle', () => {
                console.warn('idle');
                this.isVisible = false;
                this.handleVisibilityChange();
            });
            v.on('wakeup', () => {
                console.warn('wakeup');
                this.isVisible = true;
                this.handleVisibilityChange();
            });
        });
    }

    openConversation(conversationId: string): () => void {
        if (this.openedConversations.has(conversationId)) {
            this.openedConversations.get(conversationId)!!.count++;
        } else {
            this.openedConversations.set(conversationId, { count: 1, unread: 0 });
        }
        return () => {
            let ex = this.openedConversations.get(conversationId);
            if (ex) {
                if (ex.count === 1) {
                    this.openedConversations.delete(conversationId);
                } else {
                    ex.count--;
                }
            }
        };
    }

    private handleVisibilityChange = () => {
        console.warn(this.isVisible);
    }

    private handleGlobalEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            console.warn(Array.of(this.openedConversations));
            if (!this.openedConversations.has(event.conversationId) || this.isVisible) {
                this.writeGlobalCounter(event.globalUnread); // Ignore incoming global counter for open chat
                this.writeConversationCounter(event.conversationId, event.unread);
                this.handleNewMessage();
            }
        } else if (event.__typename === 'UserEventRead') {
            this.writeGlobalCounter(event.globalUnread);
            this.writeConversationCounter(event.conversationId, event.unread);
        }
    }

    private handleNewMessage = () => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
    }

    private writeGlobalCounter = (counter: number) => {
        let existing = this.client.readQuery({
            query: GlobalCounterQuery.document
        });
        if (existing) {
            (existing as any).counter.unreadCount = counter;
            this.client.writeQuery({
                query: GlobalCounterQuery.document,
                data: existing
            });
        }
    }

    private writeConversationCounter = (conversationId: string, counter: number) => {
        let id = defaultDataIdFromObject({ __typename: 'SharedConversation', id: conversationId })!!;
        let conv = this.client.readFragment({
            id,
            fragment: SHARED_CONVERSATION_COUNTER
        });
        if (conv) {
            (conv as any).unreadCount = counter;
            this.client.writeFragment({
                id,
                fragment: SHARED_CONVERSATION_COUNTER,
                data: conv
            });
            return;
        }

        id = defaultDataIdFromObject({ __typename: 'PrivateConversation', id: conversationId })!!;
        conv = this.client.readFragment({
            id,
            fragment: PRIVATE_CONVERSATION_COUNTER
        });
        if (conv) {
            (conv as any).unreadCount = counter;
            this.client.writeFragment({
                id,
                fragment: PRIVATE_CONVERSATION_COUNTER,
                data: conv
            });
            return;
        }
    }
}

export const MessengerContext = React.createContext<MessengerEngine>(undefined as any);