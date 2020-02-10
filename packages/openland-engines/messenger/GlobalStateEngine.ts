import { reliableWatcher } from 'openland-api/reliableWatcher';
import { Queue } from 'openland-y-utils/Queue';
import { MessengerEngine } from '../MessengerEngine';
import { backoff } from 'openland-y-utils/timer';
import * as Types from 'openland-api/spacex.types';
import { createLogger } from 'mental-log';
import { currentTimeMillis } from 'openland-y-utils/currentTime';
import { InvalidationQueue } from 'openland-y-utils/InvalidationQueue';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

const log = createLogger('Engine-Global');

export class GlobalStateEngine {
    readonly engine: MessengerEngine;
    private visibleConversations = new Set<string>();
    private counterQueue: InvalidationQueue;
    private counterState!: Types.GlobalCounter;
    private queue = new Queue();

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
        reliableWatcher(handler => this.engine.client.subscribeSettingsWatch(handler), () => {
            log.log('New settings received');
        });

        // Global Counter
        let counter = backoff(async () => {
            return await this.engine.client.queryGlobalCounter({ fetchPolicy: 'cache-first' });
        });
        this.counterState = await counter;
        // Why?
        this.engine.notifications.handleGlobalCounterChanged(this.counterState.alphaNotificationCounter.unreadCount);

        (async () => {
            while (true) {
                let update = await this.queue.get();
                for (let u of update.events) {
                    await backoff(() => this.handleGlobalEvent(u));
                }
                await backoff(() => this.engine.dialogList.handleStateProcessed(update.state));
            }
        })();

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
        sequenceWatcher<Types.DialogsWatch>(state, (s, handler) => this.engine.client.subscribeDialogsWatch({ state: s }, handler), (src) => {
            if (src.event.__typename === 'DialogUpdateSingle') {
                this.queue.post({ state: src.event.state, events: [src.event.update] });
                return src.event.state;
            } else if (src.event.__typename === 'DialogUpdateBatch') {
                this.queue.post({ state: src.event.state, events: src.event.updates });
                return src.event.state;
            }
            return null;
        });
    }

    resolvePrivateConversation = async (uid: string) => {
        let res = await this.engine.client.queryRoomPico({ id: uid });
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

    private handleGlobalEvent = async (event: Types.DialogUpdateFragment) => {
        // console.log(event);
        let start = currentTimeMillis();
        log.log('Event Received');

        if (event.__typename === 'DialogMessageReceived') {
            let visible = this.visibleConversations.has(event.cid);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            let start2 = currentTimeMillis();
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);
            if (!visible && event.message.sender.id !== this.engine.user.id) {
                this.engine.notifications.handleIncomingMessage(event.cid, event);
            }
            log.log('Notifications handled in ' + (currentTimeMillis() - start2) + ' ms');

            // Dialogs List
            await this.engine.dialogList.handleNewMessage(event, visible);
        } else if (event.__typename === 'DialogMessageRead') {
            let visible = this.visibleConversations.has(event.cid);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            await this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            // Dialogs List
            await this.engine.dialogList.handleUserRead(event.cid, event.unread, visible, event.haveMention);
            if (event.mid) {
                await this.engine.getConversation(event.cid).onMessageReadEvent(event.mid);
            }
        } else if (event.__typename === 'DialogMessageDeleted') {
            let visible = this.visibleConversations.has(event.cid);

            // Global counter
            await this.writeGlobalCounter(event.globalUnread, visible);

            // Notifications
            await this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);

            await this.engine.dialogList.handleMessageDeleted(event.cid, event.message.id, event.prevMessage, event.unread, event.haveMention, this.engine.user.id);
        } else if (event.__typename === 'DialogPeerUpdated') {
            log.warn('peer updated ' + event);
            await this.engine.dialogList.handlePeerUpdated(event.cid, event.peer);
            this.engine.getConversation(event.cid).handlePeerUpdated(event.peer);
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
            this.engine.getConversation(event.cid).handleMuteUpdated(event.mute);
        } else if (event.__typename === 'DialogMessageUpdated') {
            // Dialogs List
            // console.log(event);
            await this.engine.dialogList.handleMessageUpdated(event);
        } else if (event.__typename === 'DialogDeleted') {
            let visible = this.visibleConversations.has(event.cid);

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

    // Some old hack for apollo, shouldn't need today
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
        await this.engine.client.updateGlobalCounter((data) => ({
            ...data, alphaNotificationCounter: {
                ...data.alphaNotificationCounter,
                unreadCount: this.counterState.alphaNotificationCounter.unreadCount
            }
        }));
    }
}