import { reliableWatcher } from 'openland-api/reliableWatcher';
import { Queue } from 'openland-y-utils/Queue';
import { MessengerEngine } from '../MessengerEngine';
import { backoff } from 'openland-y-utils/timer';
import * as Types from 'openland-api/spacex.types';
import { createLogger } from 'mental-log';
import { currentTimeMillis } from 'openland-y-utils/currentTime';
import { InvalidationQueue } from 'openland-y-utils/InvalidationQueue';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

const log = createLogger('Engine-Dialog-Sequence');

export class DialogSequenceEngine {
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
        let start = Date.now();
        log.log('Loading initial state');

        // Settings Watch
        await backoff(async () => {
            return await this.engine.client.querySettings({ fetchPolicy: 'cache-first' });
        });
        this.engine.client.querySettings({ fetchPolicy: 'network-only' });
        reliableWatcher(handler => this.engine.client.subscribeSettingsWatch(handler), () => {
            log.log('New settings received');
        });
        log.log('Settings loaded in ' + (Date.now() - start) + ' ms');

        // Global Counter
        start = Date.now();
        let counter = backoff(async () => {
            return await this.engine.client.queryGlobalCounter({ fetchPolicy: 'cache-first' });
        });
        this.counterState = await counter;
        this.engine.notifications.handleGlobalCounterChanged(this.counterState.alphaNotificationCounter.unreadCount);
        log.log('Global counter loaded in ' + (Date.now() - start) + ' ms');

        // Main Sequence Updates Queue
        (async () => {
            while (true) {
                let update = await this.queue.get();
                for (let u of update.events) {
                    await backoff(() => this.handleGlobalEvent(u));
                }
                await backoff(() => this.engine.dialogList.handleStateProcessed(update.state));
            }
        })();
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
        this.engine.dialogList.onConversationVisible(conversationId);
    }

    onConversationHidden = (conversationId: string) => {
        this.visibleConversations.delete(conversationId);
        this.engine.dialogList.onConversationHidden(conversationId);
    }

    destroy = () => {
        // TODO: Implement
        // if (this.watcher) {
        //     this.watcher.destroy();
        //     this.watcher = null;
        // }
    }

    private handleGlobalEvent = async (event: Types.DialogUpdateFragment) => {
        let start = currentTimeMillis();

        //
        // Global Counter
        //

        if (event.__typename === 'DialogMessageReceived'
            || event.__typename === 'DialogMessageRead'
            || event.__typename === 'DialogMessageDeleted'
            || event.__typename === 'DialogBump'
            || event.__typename === 'DialogDeleted') {
            let visible = this.visibleConversations.has(event.cid);
            await this.writeGlobalCounter(event.globalUnread, visible);
        }

        //
        // Conversation
        //

        if (event.__typename === 'DialogPeerUpdated') {
            await this.engine.getConversation(event.cid).handlePeerUpdated(event.peer);
        } else if (event.__typename === 'DialogMuteChanged') {
            await this.engine.getConversation(event.cid).handleMuteUpdated(event.mute);
        } else if (event.__typename === 'DialogMessageRead') {
            if (event.mid) {
                await this.engine.getConversation(event.cid).onMessageReadEvent(event.mid);
            }
        }

        //
        // Notifications
        //

        if (event.__typename === 'DialogMessageReceived') {
            let visible = this.visibleConversations.has(event.cid);

            // Notifications
            let start2 = currentTimeMillis();
            this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);
            if (!visible && event.message.sender.id !== this.engine.user.id) {
                this.engine.notifications.handleIncomingMessage(event.cid, event);
            }
            log.log('Notifications handled in ' + (currentTimeMillis() - start2) + ' ms');

        } else if (event.__typename === 'DialogMessageRead'
            || event.__typename === 'DialogMessageDeleted'
            || event.__typename === 'DialogBump'
            || event.__typename === 'DialogDeleted') {
            await this.engine.notifications.handleGlobalCounterChanged(event.globalUnread);
        }

        // Handle Dialog Updates
        let processed = await this.engine.dialogList.handleUpdate(event);
        if (!processed) {
            log.log('Unhandled update: ' + event.__typename);
        }

        log.log('Event Processed in ' + (currentTimeMillis() - start) + ' ms');
    }

    private writeGlobalCounter = async (counter: number, visible: boolean) => {
        if (visible) {
            if (this.counterState.alphaNotificationCounter.unreadCount < counter) {
                return;
            }
        }
        this.counterState.alphaNotificationCounter.unreadCount = counter;
        this.counterQueue.invalidate();
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