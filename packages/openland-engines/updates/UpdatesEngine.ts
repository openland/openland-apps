import { Sequencer } from './utils/Sequencer';
import { AsyncLock } from '@openland/patterns';
import { WatchUpdates_watchUpdates_UpdateSubscriptionEvent, GetState } from './../../openland-api/spacex.types';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/spacex';
import { WatchUpdates } from 'openland-api/spacex.types';

type Event = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['event'];
type EventContainer = WatchUpdates_watchUpdates_UpdateSubscriptionEvent;
// type EventSequence = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['sequence'];

export class UpdatesEngine {
    readonly client: OpenlandClient;
    private closed = false;
    private subscription: GraphqlActiveSubscription<WatchUpdates> | null = null;
    private lock = new AsyncLock();

    private checkpoint!: string;
    private invalidationRequequested = false;
    private invalidationRequestTimer: any | null = null;
    private invalidated = true;
    private subscribedFrom: number | null = null;
    private mainSequencer = new Sequencer<EventContainer>();
    private sequenceSequencers = new Map<string, Sequencer<Event>>();

    constructor(client: OpenlandClient) {
        this.client = client;
        this.init();
    }

    //
    // Handler
    //

    private async handleUpdate(event: Event) {
        console.warn('subscription: event ', event);
    }

    private async handleSequenceState(sequence: string, pts: number) {
        console.warn('subscription: state ', { sequence, pts });
        let ss = new Sequencer<Event>();
        ss.reset(pts);
        this.sequenceSequencers.set(sequence, ss);
    }

    private async handleSequenceDiffUpdate(sequence: string, pts: number, events: { pts: number, event: Event }[]) {
        console.warn('subscription: diff ', { sequence, pts, events });
        if (this.sequenceSequencers.has(sequence)) {
            let ex = this.sequenceSequencers.get(sequence)!;
            for (let e of events) {
                ex.receive(e.pts, e.event);
            }
            let drained = ex.drainAllTo(pts);
            for (let d of drained) {
                await this.handleUpdate(d);
            }
            drained = ex.drain();
            for (let d of drained) {
                await this.handleUpdate(d);
            }
        } else {
            for (let d of events) {
                await this.handleUpdate(d.event);
            }
            let ss = new Sequencer<Event>();
            ss.reset(pts);
            this.sequenceSequencers.set(sequence, ss);
        }
    }

    private async handleSequenceUpdate(sequence: string, pts: number, event: Event) {
        console.warn('subscription: update ', { sequence, pts, event });
        if (this.sequenceSequencers.has(sequence)) {
            let ex = this.sequenceSequencers.get(sequence)!;
            ex.receive(pts, event);
            let drained = ex.drain();
            for (let d of drained) {
                await this.handleUpdate(d);
            }
        } else {
            await this.handleUpdate(event);
            let ss = new Sequencer<Event>();
            ss.reset(pts);
            this.sequenceSequencers.set(sequence, ss);
        }
    }

    //
    // State/Diff
    //

    private async onStateLoaded(state: GetState) {
        console.warn('subscription: loaded');
        console.warn(state);

        // Ignore if already ready
        if (!this.invalidated) {
            return;
        }

        // Became validated
        this.invalidated = false;
        this.mainSequencer.reset(state.updatesState.seq);
        this.checkpoint = state.updatesState.state;

        // Persist initial pts
        for (let s of state.updatesState.sequences) {
            await this.handleSequenceState(s.sequence.id, s.pts);
        }

        // Enforce invalidation if there is a gap
        if (this.subscribedFrom !== null) {
            if (state.updatesState.seq > this.subscribedFrom) {
                await this.invalidate();
                return;
            }
        }

        // Invalidation not needed - became ready
        await this.onValidated();
    }

    private updateInvalidationRequest() {
        if (this.invalidated) {
            return;
        }

        // Check if state is invalid
        let invalidState = this.mainSequencer.hasPending && this.mainSequencer.counter !== null;
        for (let v of this.sequenceSequencers.values()) {
            if (v.hasPending) {
                invalidState = true;
            }
        }

        if (!invalidState) {
            // Cancel invalidation request if needed
            if (this.invalidationRequequested) {
                clearTimeout(this.invalidationRequestTimer);
                this.invalidationRequequested = false;
                this.invalidationRequestTimer = null;
            }
        } else {
            // Create invalidation request if needed
            if (!this.invalidationRequequested) {
                this.invalidationRequequested = true;
                this.invalidationRequestTimer = setTimeout(() => {
                    this.lock.inLock(async () => await this.invalidate());
                }, 5000);
            }
        }
    }

    private async invalidate() {

        // Mark as invalidated
        if (this.invalidated) {
            return;
        }
        this.invalidated = true;

        // Reset invalidation timer
        if (this.invalidationRequequested) {
            clearTimeout(this.invalidationRequestTimer);
            this.invalidationRequequested = false;
            this.invalidationRequestTimer = null;
        }

        // Lifecycle
        await this.onInvalidated();

        // Perform difference
        let hasMore = true;
        while (hasMore) {

            // Get Difference
            let diff = await backoff(() => this.client.queryGetDifference({ state: this.checkpoint }));

            // Apply Difference
            for (let d of diff.updatesDifference.sequences) {
                await this.handleSequenceDiffUpdate(d.sequence.id, d.pts, d.events);
            }

            // Save checkpoint
            this.checkpoint = diff.updatesDifference.state;

            // Reset main sequencer
            this.mainSequencer.reset(diff.updatesDifference.seq);

            // Continue
            hasMore = diff.updatesDifference.hasMore;

            // If there is a subscription - check consistency
            if (!hasMore) {
                hasMore = this.subscribedFrom !== null && this.mainSequencer.counter !== null && this.subscribedFrom > this.mainSequencer.counter;
            }
        }

        // Mark as validated
        this.invalidated = false;
        await this.onValidated();
    }

    //
    // Invalidation
    //

    private async onValidated() {
        console.warn('subscription: validated');

        // Drain pending
        let drained = this.mainSequencer.drain();
        for (let d of drained) {
            await this.handleSequenceUpdate(d.sequence.id, d.pts, d.event);
        }
    }

    private async onInvalidated() {
        console.warn('subscription: invalidated');

        // TODO: Implement
    }

    //
    // Subscription
    //

    private async onSubscriptionStopped() {
        this.subscribedFrom = null;
    }

    private async onSubscriptionStarted(seq: number) {
        this.subscribedFrom = seq;

        // Invalidate if there is a sequence gap
        if (!this.invalidated) {
            if (this.mainSequencer.counter !== null && seq > this.mainSequencer.counter) {
                await this.invalidate(); // Invalidate if we subscribed after current seq
            }
        }
    }

    private async onSubscriptionEvent(event: EventContainer) {

        // Save update
        this.mainSequencer.receive(event.seq, event);

        // If not invalidated - drain and apply
        if (!this.invalidated) {
            let drained = this.mainSequencer.drain();
            for (let d of drained) {
                await this.handleSequenceUpdate(d.sequence.id, d.pts, d.event);
            }
        }

        // Update invalidation request
        this.updateInvalidationRequest();
    }

    private async onSubscriptionCheckpoint(seq: number, state: string) {

        // Persist checkpoint if not invalidated
        if (!this.invalidated && this.mainSequencer.counter !== null && this.mainSequencer.counter >= seq) {
            this.checkpoint = state;
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
                    this.lock.inLock(async () => await this.onSubscriptionStarted(update.seq));
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