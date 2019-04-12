import { MessengerEngine } from '../MessengerEngine';
import { backoff } from 'openland-y-utils/timer';
import { GlobalCounterQuery, ChatSearchGroupQuery } from 'openland-api';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { RoomQuery } from 'openland-api';
import { MarkSequenceReadMutation } from 'openland-api';
import * as Types from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { currentTimeMillis } from 'openland-y-utils/currentTime';

const log = createLogger('Engine-Global');

export class GlobalStateEngine {
    readonly engine: MessengerEngine;
    private watcher: SequenceModernWatcher<Types.DialogsWatch, Types.DialogsWatchVariables> | null = null;
    private visibleConversations = new Set<string>();
    private isVisible = true;
    private maxSeq = 0;
    private lastReportedSeq = 0;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async () => {
        log.log('Loading initial state');

        // Loading settings
        let settings = backoff(async () => {
            return await this.engine.client.querySettings({ fetchPolicy: 'cache-first' });
        });
        this.engine.client.querySettings({ fetchPolicy: 'network-only' });

        let counter = backoff(async () => {
            await this.engine.client.queryGlobalCounter({ fetchPolicy: 'cache-first' });
        })

        // Loading initial chat state
        let start = Date.now();
        let res = (await backoff(async () => {
            return await this.engine.client.queryDialogs({}, { fetchPolicy: 'network-only' });
        }));
        await settings;
        await counter;
        log.log('Dialogs loaded in ' + (Date.now() - start) + ' ms');

        this.engine.notifications.handleGlobalCounterChanged((res as any).counter.unreadCount);
        this.engine.dialogList.handleInitialDialogs((res as any).dialogs.items, (res as any).dialogs.cursor);

        // Starting Sequence Watcher
        this.watcher = new SequenceModernWatcher('global', this.engine.client.subscribeDialogsWatch({ state: (res as any).state.state }), this.engine.client.client, this.handleGlobalEvent, this.handleSeqUpdated, undefined, (res as any).state.state);

        // Subscribe for settings update
        let settingsSubscription = this.engine.client.subscribeSettingsWatch();
        (async () => {
            while (true) {
                await settingsSubscription.get();
                log.log('New settings received');
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
        let start = currentTimeMillis();
        log.log('Event Received');
        // console.log('handleGlobalEvent', event);
        if (event.__typename === 'DialogMessageReceived') {
            let visible = this.visibleConversations.has(event.cid);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            let start2 = currentTimeMillis();
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);
            if (!visible && event.message.sender.id !== this.engine.user.id) {
                this.engine.notifications.handleIncomingMessage(event.cid, event.message);
            }
            log.log('Notifications handled in ' + (currentTimeMillis() - start2) + ' ms');

            // Dialogs List
            await this.engine.dialogList.handleNewMessage(event, visible);
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

            this.engine.dialogList.handleMessageDeleted(event.cid, event.message.id, event.prevMessage, event.unread, event.haveMention, this.engine.user.id);
        } else if (event.__typename === 'DialogTitleUpdated') {
            log.warn('new title ' + event);
            this.engine.dialogList.handleTitleUpdated(event.cid, event.title);
            this.engine.getConversation(event.cid).handleTitleUpdated(event.title)
        } else if (event.__typename === 'DialogBump') {
            let visible = this.visibleConversations.has(event.cid);
            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            let res = this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            // Dialogs List
            let res2 = this.engine.dialogList.handleNewMessage({ ...event, message: event.topMessage }, visible);
            await res;
            await res2;
        } else if (event.__typename === 'DialogMuteChanged') {
            log.warn('new mute ' + event);
            this.engine.dialogList.handleMuteUpdated(event.cid, event.mute);
            log.log(event.cid);
            this.engine.getConversation(event.cid).handleMuteUpdated(event.mute)
        } else if (event.__typename === 'DialogMentionedChanged') {
            log.warn('new haveMention ' + event);
            this.engine.dialogList.handleHaveMentionUpdated(event.cid, event.haveMention);
        } else if (event.__typename === 'DialogPhotoUpdated') {
            log.warn('new photo ' + event);
            this.engine.dialogList.handlePhotoUpdated(event.cid, event.photo);
            this.engine.getConversation(event.cid).handlePhotoUpdated(event.photo)
        } else if (event.__typename === 'DialogMessageUpdated') {
            // Dialogs List
            // console.log(event);
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
            log.log('Unhandled update: ' + event.__typename);
        }
        log.log('Event Processed in ' + (currentTimeMillis() - start) + ' ms');
    }

    // looks like thmth is broken in apollo query with react alpha - Query not updated  after writeQuery
    // temp solution - use listener
    private counterListeners: ((count: number, visible: boolean) => void)[] = [];
    subcribeCounter = (listener: (count: number, visible: boolean) => void) => {
        this.counterListeners.push(listener);
        return () => {
            let index = this.counterListeners.indexOf(listener);
            if (index < 0) {
                log.warn('Double unsubscribe detected!');
            } else {
                this.counterListeners.splice(index, 1);
            }
        };
    }

    private writeGlobalCounter = async (counter: number, visible: boolean) => {

        let start = currentTimeMillis();
        //
        // Update counter anywhere in the app
        //

        await this.engine.client.client.updateQuery((data) => {
            if (visible) {
                if (data.alphaNotificationCounter.unreadCount < counter) {
                    return null;
                }
            }
            data.alphaNotificationCounter.unreadCount = counter;
            return data;
        }, GlobalCounterQuery);

        log.log('Counter written in ' + (currentTimeMillis() - start) + ' ms');

        for (let l of this.counterListeners) {
            l(counter, visible);
        }
    }
}