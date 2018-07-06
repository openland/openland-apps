import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { SequenceWatcher } from './SequenceWatcher';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';
import { defaultDataIdFromObject, ID_KEY } from 'apollo-cache-inmemory';
import { backoff } from 'openland-x-utils/timer';
import { ChatReadMutation } from 'openland-api/ChatReadMutation';
import { Badge } from './utils/Badge';
import { Router } from '../../routes';
import { ChatListQuery } from 'openland-api';
import { speakText } from './utils/Speak';
import { MessageSender } from './MessageSender';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import { UserShort } from 'openland-api/fragments/UserShort';

let GLOBAL_SUBSCRIPTION = gql`
    subscription GlobalSubscription($seq: Int) {
        event: alphaSubscribeEvents(fromSeq: $seq) {
            seq
            ... on UserEventMessage {
                unread
                globalUnread
                conversationId
                isOut
                repeatKey
                conversation {
                    id
                    title
                }
                message {
                    ...MessageFull
                }
            }
            ... on UserEventRead {
                unread
                globalUnread
                conversationId
            }
        }
    }
    ${UserShort}
    ${MessageFull}
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
    private globalWatcher: SequenceWatcher | null = null;
    private notify = backoff(() => import('notifyjs'));
    private badge = new Badge();
    private close: any = null;
    readonly sender: MessageSender;

    constructor(client: ApolloClient<{}>) {
        this.client = client;
        this.sender = new MessageSender(client);
        console.warn('MessengerEngine started');
        backoff(() => import('ifvisible.js')).then((v) => {
            v.on('idle', () => {
                this.isVisible = false;
                this.handleVisibilityChange();
            });
            v.on('wakeup', () => {
                this.isVisible = true;
                this.handleVisibilityChange();
            });
        });

        this.notify.then((v) => {
            if ((v as any).needsPermission && (v as any).isSupported()) {
                (v as any).requestPermission();
            }
        });
        this.badge.init();
        this.doStart();
    }

    private doStart = async () => {
        let res = await backoff(async () => {
            let r = await this.client.query({
                query: ChatListQuery.document
            });
            if (r.errors) {
                console.warn(r.errors);
                throw Error('Try again!');
            }
            return r.data;
        });
        let seq = (res as any).chats.seq;
        this.globalWatcher = new SequenceWatcher('global', GLOBAL_SUBSCRIPTION, seq, {}, this.handleGlobalEvent, this.client);
    }

    destroy() {
        if (this.globalWatcher) {
            this.globalWatcher.destroy();
            this.globalWatcher = null;
        }
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
        if (this.isVisible) {
            if (this.close) {
                this.close.close();
                this.close = null;
            }
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
            this.badge.badge(0);
        }
    }

    private handleGlobalEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            let visible = this.openedConversations.has(event.conversationId) && this.isVisible;
            this.writeGlobalCounter(event.globalUnread, visible);
            if (!visible && !event.isOut && !(event.message.message && event.message.message.trim().startsWith('speak: '))) {
                this.handleNewMessage(event.conversationId);
            }
            if (event.message.message && event.message.message.trim().startsWith('speak: ')) {
                speakText(event.message.message.trim().substring(7).trim());
            }
            let data = this.client.readQuery({
                query: ChatListQuery.document
            }) as any;
            if (data) {
                data.chats.seq = event.seq;
                let exIndex = data.chats.conversations.findIndex((v: any) => v.id === event.conversationId);
                if (exIndex >= 0) {
                    let ids = data.chats.conversations.map((v: any) => v[ID_KEY]);
                    let c = data.chats.conversations[exIndex];
                    if (!visible || c.unreadCount > event.unread) {
                        c.unreadCount = event.unread;
                    }
                    data.chats.conversations.splice(exIndex, 1);
                    data.chats.conversations.unshift(c);
                    data.chats.conversations = data.chats.conversations.map((v: any, i: number) => ({ ...v, [ID_KEY]: ids[i] }));
                } else {
                    data.chats.conversations.unshift({
                        __typename: event.conversation.__typename,
                        id: event.conversation.id,
                        title: event.conversation.title,
                        unreadCount: event.unread,
                        [ID_KEY]: defaultDataIdFromObject(event.conversation)
                    });
                }
                this.client.writeQuery({
                    query: ChatListQuery.document,
                    data: data
                });
            }
        } else if (event.__typename === 'UserEventRead') {
            let visible = this.openedConversations.has(event.conversationId) && this.isVisible;
            this.writeGlobalCounter(event.globalUnread, visible);
            this.writeConversationCounter(event.conversationId, event.unread, visible);
        }
    }

    private handleNewMessage = (conversationId: string) => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
        this.notify.then((v) => {
            if (!(v as any).needsPermission) {
                if (this.close) {
                    this.close.close();
                    this.close = null;
                }
                let not = new (v as any)('New Message', {
                    body: 'You got new message!',
                    notifyClick: () => {
                        if (this.close) {
                            this.close.close();
                            this.close = null;
                        }
                        Router.replaceRoute('/mail/' + conversationId);
                        window.focus();
                    }
                });
                this.close = not;
                not.show();
            }
        });
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
        if (!this.isVisible) {
            this.badge.badge(counter);
        }
    }

    private writeConversationCounter = (conversationId: string, counter: number, visible: boolean) => {
        let id = defaultDataIdFromObject({ __typename: 'SharedConversation', id: conversationId })!!;
        let conv = this.client.readFragment({
            id,
            fragment: SHARED_CONVERSATION_COUNTER
        });
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).unreadCount < counter) {
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
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).unreadCount < counter) {
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