import { MessengerEngine } from '../MessengerEngine';
import { backoff } from 'openland-y-utils/timer';
import { GlobalCounterQuery } from 'openland-api';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { MarkSequenceReadMutation } from 'openland-api';
import * as Types from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { currentTimeMillis } from 'openland-y-utils/currentTime';
import { InvalidationQueue } from 'openland-y-utils/InvalidationQueue';

const log = createLogger('Engine-Global');

export class GlobalStateEngine {
    readonly engine: MessengerEngine;
    private watcher: SequenceModernWatcher<Types.DialogsWatch, Types.DialogsWatchVariables> | null = null;
    private notificationsCenterWatcher: SequenceModernWatcher<Types.MyNotificationsCenter, Types.MyNotificationsCenterVariables> | null = null;
    private commentsCenterWatcher: SequenceModernWatcher<Types.CommentUpdatesGlobal, Types.CommentUpdatesGlobalVariables> | null = null;
    private visibleConversations = new Set<string>();
    private isVisible = true;
    private maxSeq = 0;
    private lastReportedSeq = 0;
    private counterQueue: InvalidationQueue;
    private counterState!: Types.GlobalCounter;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.counterQueue = new InvalidationQueue(this.flushGlobalCounter);
    }

    start = async () => {
        log.log('Loading initial state');

        // Settings Watch
        await backoff(async () => {
            return await this.engine.client.querySettings({ fetchPolicy: 'cache-first' });
        });
        this.engine.client.querySettings({ fetchPolicy: 'network-only' });
        let settingsSubscription = this.engine.client.subscribeSettingsWatch();
        (async () => {
            while (true) {
                await settingsSubscription.get();
                log.log('New settings received');
            }
        })();

        // Global Counter
        let counter = backoff(async () => {
            return await this.engine.client.queryGlobalCounter({ fetchPolicy: 'cache-first' });
        });
        this.counterState = await counter;
        // Why?
        this.engine.notifications.handleGlobalCounterChanged(this.counterState.alphaNotificationCounter.unreadCount);

        // Loading initial chat state
        // let start = Date.now();
        // let res = (await backoff(async () => {
        //     return await this.engine.client.queryDialogs({}, { fetchPolicy: 'network-only' });
        // }));
        // log.log('Dialogs loaded in ' + (Date.now() - start) + ' ms');

        // this.engine.dialogList.handleInitialDialogs(res.dialogs.items, res.dialogs.cursor);

        // Starting Sequence Watcher
        // this.watcher = new SequenceModernWatcher('global', this.engine.client.subscribeDialogsWatch({ state: res.state.state }), this.engine.client.client, this.handleGlobalEvent, this.handleSeqUpdated, undefined, res.state.state);
    }

    handleDialogsStarted = (state: string) => {
        this.watcher = new SequenceModernWatcher(
            'global',
            this.engine.client.subscribeDialogsWatch({ state }),
            this.engine.client.client,
            this.handleGlobalEvent,
            this.handleSeqUpdated,
            undefined,
            state,
            async (st) => {
                await this.engine.dialogList.handleStateProcessed(st);
            }
        );
    }

    handleNotificationsCenterStarted = (state: string) => {
        this.notificationsCenterWatcher = new SequenceModernWatcher(
            'global.myNotifications',
            this.engine.client.subscribeMyNotificationsCenter({ state }),
            this.engine.client.client,
            this.handleGlobalEvent,
            this.handleSeqUpdated,
            undefined,
            state,
            async (st) => {
                await this.engine.notificationCenter.handleStateProcessed(st);
            }
        );
    }

    handleCommentsCenterStarted = (state: string) => {
        this.commentsCenterWatcher = new SequenceModernWatcher(
            'global.comments',
            this.engine.client.subscribeCommentUpdatesGlobal({state}),
            this.engine.client.client,
            this.handleGlobalEvent,
            this.handleSeqUpdated,
            undefined,
            '',
            undefined
        )
    }

    resolvePrivateConversation = async (uid: string) => {
        let res = await this.engine.client.queryRoom({ id: uid });
        return {
            id: res.room!!.id,
            flexibleId: uid
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
        // console.log(event);
        let start = currentTimeMillis();
        log.log('Event Received');
        // console.log('handleGlobalEvent', event);
        if (event.__typename === 'CommentPeerUpdated') {
            await this.engine.notificationCenter.handleCommentSubscriptionUpdate(event);
        }
        if (event.__typename === 'NotificationReceived') {
            await this.engine.notificationCenter.handleNotificationReceived(event);
        } else if (event.__typename === 'NotificationDeleted') {
            await this.engine.notificationCenter.handleNotificationDeleted(event);
        } else if (event.__typename === 'NotificationRead') {
            await this.engine.notificationCenter.handleNotificationRead(event);
        } else if (event.__typename === 'DialogMessageReceived') {
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
            await this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            // Dialogs List
            await this.engine.dialogList.handleUserRead(event.cid, event.unread, visible, event.haveMention);
        } else if (event.__typename === 'DialogMessageDeleted') {
            let visible = this.visibleConversations.has(event.conversationId);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            await this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            await this.engine.dialogList.handleMessageDeleted(event.cid, event.message.id, event.prevMessage, event.unread, event.haveMention, this.engine.user.id);
        } else if (event.__typename === 'DialogTitleUpdated') {
            log.warn('new title ' + event);
            await this.engine.dialogList.handleTitleUpdated(event.cid, event.title);
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
            await this.engine.dialogList.handleMuteUpdated(event.cid, event.mute);
            log.log(event.cid);
            this.engine.getConversation(event.cid).handleMuteUpdated(event.mute)
        } else if (event.__typename === 'DialogPhotoUpdated') {
            log.warn('new photo ' + event);
            await this.engine.dialogList.handlePhotoUpdated(event.cid, event.photo);
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
            await this.engine.dialogList.handleDialogDeleted(event);
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

        //
        // Update counter anywhere in the app
        //
        if (visible) {
            if (this.counterState.alphaNotificationCounter.unreadCount < counter) {
                return;
            }
        }
        this.counterState.alphaNotificationCounter.unreadCount = counter;
        this.counterQueue.invalidate();

        // Notofy listeners
        for (let l of this.counterListeners) {
            l(counter, visible);
        }
    }

    private flushGlobalCounter = async () => {
        await this.engine.client.client.writeQuery(JSON.parse(JSON.stringify(this.counterState)), GlobalCounterQuery);
    }
}