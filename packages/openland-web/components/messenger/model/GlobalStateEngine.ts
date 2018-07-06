import { MessengerEngine } from '../MessengerEngine';
import { UserShort } from 'openland-api/fragments/UserShort';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import gql from 'graphql-tag';
import { backoff } from 'openland-x-utils/timer';
import { ChatListQuery, GlobalCounterQuery } from 'openland-api';
import { SequenceWatcher } from './SequenceWatcher';
import { defaultDataIdFromObject, ID_KEY } from '../../../../../node_modules/apollo-cache-inmemory';

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

export class GlobalStateEngine {
    readonly engine: MessengerEngine;
    private watcher: SequenceWatcher | null = null;
    private visibleConversations = new Set<string>();
    private counterHandler: ((counter: number) => void) | null = null;
    private messageHandler: ((message: any) => void) | null = null;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async (counterHandler: (counter: number) => void, messageHandler: (message: any) => void) => {
        this.counterHandler = counterHandler;
        this.messageHandler = messageHandler;
        console.info('[global] Loading initial state');
        let res = (await backoff(async () => {
            return await this.engine.client.query({
                query: ChatListQuery.document
            });
        })).data;
        let seq = (res as any).chats.seq;
        console.info('[global] Initial state loaded with seq #' + seq);
        this.watcher = new SequenceWatcher('global', GLOBAL_SUBSCRIPTION, seq, {}, this.handleGlobalEvent, this.engine.client);
    }

    onConversationVisible = (conversationId: string) => {
        this.visibleConversations.add(conversationId);
    }

    onConversationHidden = (conversationId: string) => {
        this.visibleConversations.delete(conversationId);
    }

    destroy = () => {
        if (this.watcher) {
            this.watcher.destroy();
            this.watcher = null;
        }
    }

    private handleGlobalEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            let visible = this.visibleConversations.has(event.conversationId);
            this.writeGlobalCounter(event.globalUnread, visible);
            this.counterHandler!!(event.globalUnread);
            if (!visible && !event.isOut) {
                this.messageHandler!!(event);
            }
            let data = this.engine.client.readQuery({
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
                this.engine.client.writeQuery({
                    query: ChatListQuery.document,
                    data: data
                });
            }
        } else if (event.__typename === 'UserEventRead') {
            let visible = this.visibleConversations.has(event.conversationId);
            this.writeGlobalCounter(event.globalUnread, visible);
            this.writeConversationCounter(event.conversationId, event.unread, visible);
        }
    }

    private writeGlobalCounter = (counter: number, visible: boolean) => {

        //
        // Update counter anywhere in the app
        //

        let existing = this.engine.client.readQuery({
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
            this.engine.client.writeQuery({
                query: GlobalCounterQuery.document,
                data: existing
            });
        }
    }

    private writeConversationCounter = (conversationId: string, counter: number, visible: boolean) => {

        //
        // Update counter in conversation
        //

        let id = defaultDataIdFromObject({ __typename: 'SharedConversation', id: conversationId })!!;
        let conv = this.engine.client.readFragment({
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
            this.engine.client.writeFragment({
                id,
                fragment: SHARED_CONVERSATION_COUNTER,
                data: conv
            });
            return;
        }

        id = defaultDataIdFromObject({ __typename: 'PrivateConversation', id: conversationId })!!;
        conv = this.engine.client.readFragment({
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
            this.engine.client.writeFragment({
                id,
                fragment: PRIVATE_CONVERSATION_COUNTER,
                data: conv
            });
            return;
        }
    }
}