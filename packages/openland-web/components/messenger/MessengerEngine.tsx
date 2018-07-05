import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { SequenceWatcher } from './SequenceWatcher';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { backoff } from 'openland-x-utils/timer';
import { ChatReadMutation } from 'openland-api/ChatReadMutation';

let GLOBAL_SUBSCRIPTION = gql`
    subscription GlobalSubscription($seq: Int) {
        event: alphaSubscribeEvents(fromSeq: $seq) {
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
    private openedConversations = new Map<string, { count: number, unread: number }>();
    private pendoingReaders = new Map<string, string>();
    private isVisible = true;
    private globalWatcher: SequenceWatcher;

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

    destroy() {
        this.globalWatcher.destroy();
    }

    readConversation(conversationId: string, messageId: string) {
        if (this.isVisible) {
            this.client.mutate({
                mutation: ChatReadMutation.document,
                variables: {
                    conversationId: conversationId,
                    messageId: messageId
                }
            });
        } else {
            this.pendoingReaders.set(conversationId, messageId);
        }
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
        if (this.isVisible) {
            if (this.pendoingReaders.size > 0) {
                for (let a of this.pendoingReaders) {
                    this.client.mutate({
                        mutation: ChatReadMutation.document,
                        variables: {
                            conversationId: a[0],
                            messageId: a[1]
                        }
                    });
                }
                this.pendoingReaders.clear();
            }
        }
    }

    private handleGlobalEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            let visible = this.openedConversations.has(event.conversationId) && this.isVisible;
            this.writeGlobalCounter(event.globalUnread, visible);
            this.writeConversationCounter(event.conversationId, event.unread, visible);
            if (!visible) {
                this.handleNewMessage();
            }
        } else if (event.__typename === 'UserEventRead') {
            let visible = this.openedConversations.has(event.conversationId) && this.isVisible;
            this.writeGlobalCounter(event.globalUnread, visible);
            this.writeConversationCounter(event.conversationId, event.unread, visible);
        }
    }

    private handleNewMessage = () => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
    }

    private writeGlobalCounter = (counter: number, visible: boolean) => {
        let existing = this.client.readQuery({
            query: GlobalCounterQuery.document
        });
        if (existing) {
            if (visible) {
                // Do not increment unread count
                if ((existing as any).counter.unreadCount < counter) {
                    return;
                }
            }
            (existing as any).counter.unreadCount = counter;
            this.client.writeQuery({
                query: GlobalCounterQuery.document,
                data: existing
            });
        }
    }

    private writeConversationCounter = (conversationId: string, counter: number, visible: boolean) => {
        let id = defaultDataIdFromObject({ __typename: 'SharedConversation', id: conversationId })!!;
        let conv = this.client.readFragment({
            id,
            fragment: SHARED_CONVERSATION_COUNTER
        });
        console.warn(conv);
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).counter.unreadCount < counter) {
                    return;
                }
            }
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
        console.warn(conv);
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).counter.unreadCount < counter) {
                    return;
                }
            }
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