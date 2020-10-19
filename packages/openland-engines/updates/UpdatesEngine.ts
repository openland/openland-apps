import { AsyncLock } from '@openland/patterns';
import { WatchUpdates_watchUpdates_UpdateSubscriptionEvent, GetState } from './../../openland-api/spacex.types';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/spacex';
import { WatchUpdates } from 'openland-api/spacex.types';

type Event = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['event'];
type EventContainer = WatchUpdates_watchUpdates_UpdateSubscriptionEvent;
type Sequence = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['sequence'];

export class UpdatesEngine {
    readonly client: OpenlandClient;
    private closed = false;
    private subscription: GraphqlActiveSubscription<WatchUpdates> | null = null;
    private lock = new AsyncLock();

    private ready = false;
    private online = false;
    private subscribedFrom: number | null = null;
    private currentSeq: number | null = null;
    private currentState: string | null = null;
    private pending = new Map<number, EventContainer>();

    constructor(client: OpenlandClient) {
        this.client = client;
        this.init();
    }

    private async handleUpdate(event: EventContainer) {
        console.warn('subscription: update ' + event.seq);
        // TODO: Implement
    }

    //
    // State/Diff
    //

    private async onStateLoaded(state: GetState) {
        console.warn('subscription: loaded');
        console.warn(state);

        // Ignore if already ready
        if (this.ready) {
            return;
        }

        // Became ready
        this.ready = true;
        this.currentSeq = state.updatesState.seq;
        this.currentState = state.updatesState.state;

        // Enforce invalidation if there is a gap
        if (this.subscribedFrom !== null) {
            if (state.updatesState.seq > this.subscribedFrom) {
                await this.invalidate();
                return;
            }
        }

        // Invalidation not needed - became ready
        await this.onReady();

        // Became online if possible
        if (this.subscribedFrom !== null) {
            this.online = true;
            await this.onOnline();
        }
    }

    private async invalidate() {
        if (!this.ready) {
            return;
        }
        this.ready = false;
        console.warn('subscription: invalidated');
        await this.onUnready();

        // TODO: Implement
    }

    //
    // Online/Offline
    //

    private async onReady() {

        console.warn('subscription: ready');

        // Flush pending
        while (this.pending.has(this.currentSeq! + 1)) {
            let e = this.pending.get(this.currentSeq! + 1)!;
            this.pending.delete(this.currentSeq! + 1);
            this.currentSeq!++;
            await this.handleUpdate(e);
        }

        // Delete too old updates
        for (let k of [...this.pending.keys()]) {
            if (k <= this.currentSeq!) {
                this.pending.delete(k);
            }
        }
    }

    private async onUnready() {
        console.warn('subscription: unready');
        // TODO: Implement
    }

    private async onOnline() {
        console.warn('subscription: online');
        // TODO: Implement
    }

    private async onOffline() {
        console.warn('subscription: offline');
        // TODO: Implement
    }

    //
    // Subscription
    //

    private async onSubscriptionStopped() {
        this.subscribedFrom = null;
        if (this.online) {
            this.online = false;
            this.onOffline();
        }
    }

    private async onSubscriptionStarted(seq: number, state: string) {
        this.subscribedFrom = seq;

        // Invalidate or became online
        if (this.ready) {
            if (this.currentSeq! > seq) {
                await this.invalidate(); // Invalidate if we subscribed after current seq
            } else {
                // Became online
                this.online = true;
                await this.onOnline();
            }
        }
    }

    private async onSubscriptionEvent(event: EventContainer) {
        if (!this.online) {
            // If not online: persist to pending
            if (!this.pending.has(event.seq)) {
                this.pending.set(event.seq, event);
            }
        } else {
            this.currentSeq = event.seq;
            this.handleUpdate(event);
        }
    }

    private async onSubscriptionCheckpoint(seq: number, state: string) {

        // Persist checkpoint if ready
        if (this.ready && this.currentSeq! >= seq) {
            this.currentState = state;
            console.warn('subscription: checkpoint at ' + seq);
        }
    }

    //
    // Lifecycle
    //

    private async init() {
        // Start subscription to start receiving updates asap
        this.startSubscription();

        // Resolve initial state
        let state = await backoff(() => this.client.queryGetState({ fetchPolicy: 'network-only' }));
        if (this.closed) {
            return;
        }
        this.lock.inLock(async () => await this.onStateLoaded(state));
    }

    close() {
        if (this.closed) {
            this.closed = true;
            if (this.subscription) {
                this.subscription.destroy();
                this.subscription = null;
            }
        }
    }

    private startSubscription() {
        if (this.closed) {
            return;
        }
        if (this.subscription) {
            throw Error('Already started');
        }
        this.subscription = this.client.subscribeWatchUpdates((e) => {
            if (e.type === 'stopped') {
                this.subscription = null;
                setTimeout(() => { this.startSubscription(); }, Math.floor(Math.random() * 1000 + 1000));
                this.lock.inLock(async () => await this.onSubscriptionStopped());
            } else if (e.type === 'message') {
                if (e.message.watchUpdates.__typename === 'UpdateSubscriptionStarted') {
                    const update = e.message.watchUpdates;
                    this.lock.inLock(async () => await this.onSubscriptionStarted(update.seq, update.state));
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionEvent') {
                    const update = e.message.watchUpdates;
                    this.lock.inLock(async () => await this.onSubscriptionEvent(update));
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionCheckpoint') {
                    const update = e.message.watchUpdates;
                    this.lock.inLock(async () => await this.onSubscriptionCheckpoint(update.seq, update.state));
                }
            }
        });
    }
}