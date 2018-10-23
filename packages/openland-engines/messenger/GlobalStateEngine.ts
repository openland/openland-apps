import { MessengerEngine } from '../MessengerEngine';
import { UserShort } from 'openland-api/fragments/UserShort';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import gql from 'graphql-tag';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery, GlobalCounterQuery, ChatInfoQuery, ChatSearchGroupQuery } from 'openland-api';
import { SequenceWatcher } from '../core/SequenceWatcher';
import { SettingsQuery } from 'openland-api/SettingsQuery';
import { SettingsFull } from 'openland-api/fragments/SettingsFragment';
import { Platform } from 'react-native';

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
                    unreadCount
                    settings{
                        id
                        mute
                    }
                    ... on GroupConversation{
                        photo
                    }
                    ... on ChannelConversation{
                        myStatus
                        photo
                    }
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
    private isVisible = true;
    private maxSeq = 0;
    private lastReportedSeq = 0;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async () => {
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
        this.engine.notifications.handleGlobalCounterChanged((res as any).counter.unreadCount);
        this.engine.dialogList.handleInitialConversations((res as any).chats.conversations, (res as any).chats.next);
        console.info('[global] Initial state loaded with seq #' + seq);

        // Starting Sequence Watcher
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

    private handleGlobalEvent = (event: any) => {
        if (event.__typename === 'UserEventMessage') {
            let visible = this.visibleConversations.has(event.conversationId);

            // Global counter
            this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);
            if (!visible && !event.isOut) {
                this.engine.notifications.handleIncomingMessage(event);
            }

            // Dialogs List
            this.engine.dialogList.handleNewMessage(event, visible);
        } else if (event.__typename === 'UserEventRead') {
            let visible = this.visibleConversations.has(event.conversationId);

            // Global counter
            this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            // Dialogs List
            this.engine.dialogList.handleUserRead(event.conversationId, event.unread, visible);
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
}