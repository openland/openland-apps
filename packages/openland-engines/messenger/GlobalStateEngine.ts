import { MessengerEngine } from '../MessengerEngine';
import gql from 'graphql-tag';
import { backoff } from 'openland-y-utils/timer';
import { GlobalCounterQuery, ChatSearchGroupQuery } from 'openland-api';
import { SettingsQuery } from 'openland-api';
import { SettingsFull } from 'openland-api/fragments/SettingsFragment';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { UserTiny } from 'openland-api/fragments/UserTiny';
import { DialogsQuery } from 'openland-api';
import { RoomQuery } from 'openland-api';
import { MarkSequenceReadMutation } from 'openland-api';
import { TinyMessage } from 'openland-api/fragments/Message';
import { RoomShort } from 'openland-api/fragments/RoomShort';

let GLOBAL_SUBSCRIPTION = gql`
    subscription GlobalSubscription($state: String) {
        event: dialogsUpdates(fromState: $state) {
            ... on DialogUpdateSingle {
                seq
                state
                update {
                    ...DialogUpdateFragment
                }
            }
            ... on DialogUpdateBatch {
                fromSeq
                seq
                state
                updates {
                    ...DialogUpdateFragment
                }
            }
        }
    }
    fragment DialogUpdateFragment on DialogUpdate {
        ... on DialogMessageReceived {
            cid
            unread
            globalUnread
            message:alphaMessage {
                    ...TinyMessage
            }
        }
        ... on DialogMessageUpdated {
            cid
            message:alphaMessage {
                    ...TinyMessage
                }
        }
        ... on DialogMessageDeleted {
            cid
            message: alphaMessage {
                    ...TinyMessage
            }
            prevMessage: alphaPrevMessage {
                ...TinyMessage
            }
            unread
            globalUnread
        }
        ... on DialogMessageRead {
            cid
            unread
            globalUnread
        }
        ... on DialogMessageRead {
            cid
            unread
            globalUnread
        }
        ... on DialogTitleUpdated {
            cid
            title
        }
        ... on DialogMuteChanged {
            cid
            mute
        }
        ... on DialogMentionedChanged {
            cid
            haveMention
        }
        ... on DialogPhotoUpdated {
            cid
            photo
        }
        ... on DialogDeleted {
            cid
            globalUnread
        }
       
    }
    ${UserTiny}
    ${TinyMessage}
    ${RoomShort}
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
    private watcher: SequenceModernWatcher | null = null;
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
        let settings = backoff(async () => {
            return await this.engine.client.client.query(SettingsQuery);
        });

        // Loading initial chat state
        let start = Date.now();
        let res = (await backoff(async () => {
            return await this.engine.client.client.query(DialogsQuery);
        }));
        await settings;
        console.log('Dialogs loaded in ' + (Date.now() - start) + ' ms');

        this.engine.notifications.handleGlobalCounterChanged((res as any).counter.unreadCount);
        this.engine.dialogList.handleInitialDialogs((res as any).dialogs.items, (res as any).dialogs.cursor);

        // Starting Sequence Watcher
        this.watcher = new SequenceModernWatcher('global', GLOBAL_SUBSCRIPTION, this.engine.client.client, this.handleGlobalEvent, this.handleSeqUpdated, undefined, (res as any).state.state);

        // Subscribe for settings update
        let settingsSubscription = this.engine.client.client.subscribe(SUBSCRIBE_SETTINGS);
        (async () => {
            while (true) {
                await settingsSubscription.get();
                console.info('New settings received');
            }
        })();
    }

    resolvePrivateConversation = async (uid: string) => {
        let res = await this.engine.client.client.query(RoomQuery, { id: uid });
        return {
            id: (res as any).room.id as string,
            flexibleId: uid
        };
    }

    resolveGroup = async (uids: string[]) => {
        let res = await this.engine.client.client.query(ChatSearchGroupQuery, { members: uids });
        if (!(res as any).group) {
            return null;
        }
        return {
            id: (res as any).group.id as string,
            flexibleId: (res as any).group.flexibleId as string
        };
    }

    onConversationVisible = (conversationId: string) => {
        this.visibleConversations.add(conversationId);
    }

    onConversationHidden = (conversationId: string) => {
        this.visibleConversations.delete(conversationId);
    }

    destroy = () => {
        // TODO: Implement
        // if (this.watcher) {
        //     this.watcher.destroy();
        //     this.watcher = null;
        // }
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
                backoff(() => this.engine.client.client.mutate(MarkSequenceReadMutation, { seq }));
            })();
        }
    }

    private handleGlobalEvent = async (event: any) => {
        console.log('handleGlobalEvent', event);
        if (event.__typename === 'DialogMessageReceived') {
            let visible = this.visibleConversations.has(event.cid);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            let res = this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);
            if (!visible && event.message.sender.id !== this.engine.user.id) {
                this.engine.notifications.handleIncomingMessage(event.cid, event.message);
            }

            // Dialogs List
            let res2 = this.engine.dialogList.handleNewMessage(event, visible);
            await res;
            await res2;
        } else if (event.__typename === 'DialogMessageRead') {
            let visible = this.visibleConversations.has(event.conversationId);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            // Dialogs List
            this.engine.dialogList.handleUserRead(event.cid, event.unread, visible);
        } else if (event.__typename === 'DialogMessageDeleted') {
            let visible = this.visibleConversations.has(event.conversationId);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            this.engine.dialogList.handleMessageDeleted(event.cid, event.message.id, event.prevMessage);
        } else if (event.__typename === 'DialogTitleUpdated') {
            console.warn('new title ', event);
            this.engine.dialogList.handleTitleUpdated(event.cid, event.title);
            this.engine.getConversation(event.cid).handleTitleUpdated(event.title)
        } else if (event.__typename === 'DialogMuteChanged') {
            console.warn('new mute ', event);
            this.engine.dialogList.handleMuteUpdated(event.cid, event.mute);
            console.log(event.cid);
            this.engine.getConversation(event.cid).handleMuteUpdated(event.mute)
        } else if (event.__typename === 'DialogMentionedChanged') {
            console.warn('new haveMention ', event);
            this.engine.dialogList.handleHaveMentionUpdated(event.cid, event.haveMention);
        } else if (event.__typename === 'DialogPhotoUpdated') {
            console.warn('new photo ', event);
            this.engine.dialogList.handlePhotoUpdated(event.cid, event.photo);
            this.engine.getConversation(event.cid).handlePhotoUpdated(event.photo)
        } else if (event.__typename === 'DialogMessageUpdated') {
            // Dialogs List
            console.log(event);
            await this.engine.dialogList.handleMessageUpdated(event);
        } else if (event.__typename === 'DialogDeleted') {
            let visible = this.visibleConversations.has(event.conversationId);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            // Remove dialog from lust
            this.engine.dialogList.handleDialogDeleted(event);
        } else {
            console.log('Unhandled update: ' + event.__typename);
        }
    }

    // looks like thmth is broken in apollo query with react alpha - Query not updated  after writeQuery
    // temp solution - use listener
    private counterListeners: ((count: number, visible: boolean) => void)[] = [];
    subcribeCounter = (listener: (count: number, visible: boolean) => void) => {
        this.counterListeners.push(listener);
        return () => {
            let index = this.counterListeners.indexOf(listener);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.counterListeners.splice(index, 1);
            }
        };
    }

    private writeGlobalCounter = async (counter: number, visible: boolean) => {

        //
        // Update counter anywhere in the app
        //

        await this.engine.client.client.updateQuery((data) => {
            if (visible) {
                if (data.counter.unreadCount < counter) {
                    return null;
                }
            }
            data.counter.unreadCount = counter;
            return data;
        }, GlobalCounterQuery);

        for (let l of this.counterListeners) {
            l(counter, visible);
        }
    }
}