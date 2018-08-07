import { MessengerEngine } from '../MessengerEngine';
import { UserShort } from 'openland-api/fragments/UserShort';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import gql from 'graphql-tag';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery, GlobalCounterQuery, ChatInfoQuery, ChatSearchGroupQuery } from 'openland-api';
import { SequenceWatcher } from '../core/SequenceWatcher';
import { defaultDataIdFromObject, ID_KEY } from 'apollo-cache-inmemory';
import { SettingsQuery } from 'openland-api/SettingsQuery';
import { SettingsFull } from 'openland-api/fragments/SettingsFragment';

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
                __typename
                unread
                globalUnread
                conversationId
                isOut
                repeatKey
                conversation {
                    id
                    flexibleId
                    title
                    photos
                }
                message {
                    ...MessageFull
                }
            }
            ... on UserEventRead {
                __typename
                unread
                globalUnread
                conversationId
            }
        }
    }
    ${UserShort}
    ${MessageFull}
`;

const MARK_SEQ_READ = gql`
    mutation MarkSequenceRead($seq: Int!) {
        alphaGlobalRead(toSeq: $seq)
    }
`;

const SUBSCRIBE_SETTINGS = gql`
    subscription SubscribeSettings {
        watchSettings {
            ...SettingsFull
        }
    }
    ${SettingsFull}
`;

export class GlobalStateEngine {
    readonly engine: MessengerEngine;
    private watcher: SequenceWatcher | null = null;
    private visibleConversations = new Set<string>();
    private counterHandler: ((counter: number) => void) | null = null;
    private messageHandler: ((message: any) => void) | null = null;
    private isVisible = true;
    private maxSeq = 0;
    private lastReportedSeq = 0;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async (counterHandler: (counter: number) => void, messageHandler: (message: any) => void) => {
        this.counterHandler = counterHandler;
        this.messageHandler = messageHandler;
        console.info('[global] Loading initial state');

        // Loading settings
        await backoff(async () => {
            return await this.engine.client.client.query({
                query: SettingsQuery.document
            });
        });

        // Loading initial chat state
        let res = (await backoff(async () => {
            return await this.engine.client.client.query({
                query: ChatListQuery.document
            });
        })).data;
        let seq = (res as any).chats.seq;
        console.info('[global] Initial state loaded with seq #' + seq);
        for (let c of (res as any).chats.conversations) {
            this.handleChatAdded(c);
        }
        this.watcher = new SequenceWatcher('global', GLOBAL_SUBSCRIPTION, seq, {}, this.handleGlobalEvent, this.engine.client, this.handleSeqUpdated);

        // Subscribe for settings update
        let settingsSubscription = this.engine.client.client.subscribe({
            query: SUBSCRIBE_SETTINGS
        });
        settingsSubscription.subscribe({
            next: (event) => {
                console.info('New settings received');
            }
        });
    }

    resolvePrivateConversation = async (uid: string) => {
        let res = await this.engine.client.client.query({
            query: ChatInfoQuery.document,
            variables: {
                conversationId: uid
            }
        });
        return {
            id: (res.data as any).chat.id as string,
            flexibleId: (res.data as any).chat.flexibleId as string
        };
    }

    resolveGroup = async (uids: string[]) => {
        let res = await this.engine.client.client.query({
            query: ChatSearchGroupQuery.document,
            variables: {
                members: uids
            }
        });
        if (!(res.data as any).group) {
            return null;
        }
        return {
            id: (res.data as any).group.id as string,
            flexibleId: (res.data as any).group.flexibleId as string
        };
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

    onVisible = (isVisible: boolean) => {
        this.isVisible = isVisible;
        if (isVisible) {
            this.reportSeqIfNeeded();
        }
    }

    private handleSeqUpdated = (seq: number) => {
        this.maxSeq = Math.max(seq, this.maxSeq);
        if (this.isVisible) {
            this.reportSeqIfNeeded();
        }
    }

    private reportSeqIfNeeded = () => {
        if (this.lastReportedSeq < this.maxSeq) {
            this.lastReportedSeq = this.maxSeq;
            let seq = this.maxSeq;
            (async () => {
                backoff(() => this.engine.client.client.mutate({
                    mutation: MARK_SEQ_READ,
                    variables: {
                        seq
                    }
                }));
            })();
        }
    }

    private handleChatAdded = (chat: any) => {
        this.engine.client.client.writeQuery({
            query: ChatInfoQuery.document,
            variables: {
                conversationId: chat.flexibleId
            },
            data: {
                chat: chat
            }
        });
        this.engine.client.client.writeQuery({
            query: ChatInfoQuery.document,
            variables: {
                conversationId: chat.id
            },
            data: {
                chat: chat
            }
        });
    }

    private handleGlobalEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            let visible = this.visibleConversations.has(event.conversationId);
            this.writeGlobalCounter(event.globalUnread, visible);
            this.counterHandler!!(event.globalUnread);
            if (!visible && !event.isOut) {
                this.messageHandler!!(event);
            }
            let data = this.engine.conversations;
            data.seq = event.seq;
            let exIndex = data.conversations.findIndex((v: any) => v.id === event.conversationId);
            if (exIndex >= 0) {
                let ids = data.conversations.map((v: any) => v[ID_KEY]);
                let c = data.conversations[exIndex];
                if (!visible || c.unreadCount > event.unread) {
                    c.unreadCount = event.unread;
                }
                c.topMessage = event.message;
                data.conversations.splice(exIndex, 1);
                data.conversations.unshift(c);
                data.conversations = data.conversations.map((v: any, i: number) => ({ ...v, [ID_KEY]: ids[i] }));
            } else {
                let chat: any = {
                    __typename: event.conversation.__typename,
                    id: event.conversation.id,
                    title: event.conversation.title,
                    unreadCount: event.unread,
                    topMessage: event.message,
                    photos: event.conversation.photos,
                    [ID_KEY]: defaultDataIdFromObject(event.conversation)
                };
                data.conversations.unshift(chat);
                this.handleChatAdded(chat);
            }

            // TODO: remove; keeping this for web - remove after migrate to flat list
            let oldData = this.engine.client.client.readQuery({
                query: ChatListQuery.document
            }) as any;
            this.engine.client.client.writeQuery({
                query: ChatListQuery.document,
                data: {
                    ...oldData,
                    chats: {
                        ...oldData.chats,
                        seq: data.seq,
                        conversations: data.conversations
                    }
                }
            });
            this.engine.conversations.onUpdate();
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

        let existing = this.engine.client.client.readQuery({
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
            this.engine.client.client.writeQuery({
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
        let conv = this.engine.client.client.readFragment({
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
            this.engine.client.client.writeFragment({
                id,
                fragment: SHARED_CONVERSATION_COUNTER,
                data: conv
            });
            return;
        }

        id = defaultDataIdFromObject({ __typename: 'PrivateConversation', id: conversationId })!!;
        conv = this.engine.client.client.readFragment({
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
            this.engine.client.client.writeFragment({
                id,
                fragment: PRIVATE_CONVERSATION_COUNTER,
                data: conv
            });
            return;
        }
    }
}