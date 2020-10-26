import { SequencesState } from './state/SequencesState';
import { MainSequenceState } from './state/MainSequenceState';
import { Transaction } from './../persistence/Persistence';
import { Sequencer } from './state/Sequencer';
import { AsyncLock } from '@openland/patterns';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/spacex';
import { WatchUpdates, WatchUpdates_watchUpdates_UpdateSubscriptionEvent } from 'openland-api/spacex.types';
import { Persistence } from 'openland-engines/persistence/Persistence';

type Event = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['event'];
type EventContainer = WatchUpdates_watchUpdates_UpdateSubscriptionEvent;
// type EventSequence = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['sequence'];

export class UpdatesEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    private started = false;
    private closed = false;
    private subscription: GraphqlActiveSubscription<WatchUpdates> | null = null;
    private lock = new AsyncLock();

    private invalidationRequequested = false;
    private invalidationRequestTimer: any | null = null;
    private invalidated = true;
    private subscribedFrom: number | null = null;
    private sequenceSequencers = new Map<string, Sequencer<Event>>();
    private mainSequence!: MainSequenceState<EventContainer>;
    private sequences!: SequencesState<Event>;

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
    }

    start() {
        if (this.closed) {
            return;
        }
        if (this.started) {
            return;
        }
        this.started = true;
        this.init();
    }

    close() {
        if (!this.closed) {
            this.closed = true;
            if (this.subscription) {
                this.subscription.destroy();
                this.subscription = null;
            }
        }
    }

    //
    // Handler
    //

    private async handleUpdate(tx: Transaction, event: Event) {
        console.warn('subscription: event ', event);
    }

    private async handleSequenceDiffUpdate(tx: Transaction, sequence: string, events: { pts: number, event: Event }[]) {
        console.warn('subscription: diff ', { sequence, events });
        let sequencer = await this.readSequence(sequence);

        if (sequencer.counter !== null) {
            for (let e of events) {
                sequencer.receive(e.pts, e.event);
            }
            let drained = sequencer.drainAllTo(events[events.length].pts);
            for (let d of drained) {
                await this.handleUpdate(tx, d);
            }
        } else {
            for (let d of events) {
                await this.handleUpdate(tx, d.event);
            }
            sequencer.reset(events[events.length].pts);
        }
        for (let d of sequencer.drain()) {
            await this.handleUpdate(tx, d);
        }
    }

    private async handleSequenceUpdate(tx: Transaction, sequence: string, pts: number, event: Event) {
        console.warn('subscription: update ', { sequence, pts, event });

        let sequencer = await this.readSequence(sequence);
        if (sequencer.counter !== null) {
            await this.handleUpdate(tx, event);
            sequencer.reset(pts);
        } else {
            sequencer.receive(pts, event);
        }

        for (let d of sequencer.drain()) {
            await this.handleUpdate(tx, d);
        }
    }

    private async readSequence(key: string) {
        let res = this.sequenceSequencers.get(key);
        if (res) {
            return res;
        }
        let sequencer = new Sequencer<Event>();
        let seq = await this.persistence.readInt('updates.sequence.' + key);
        if (seq !== null) {
            sequencer.reset(seq);
        }
        this.sequenceSequencers.set(key, sequencer);
        return sequencer;
    }

    //
    // Invalidation
    //

    private updateInvalidationRequest() {
        if (this.invalidated) {
            return;
        }

        // Check if state is invalid
        let invalidState = this.mainSequence.invalid;
        for (let v of this.sequenceSequencers.values()) {
            if (v.hasPending) {
                invalidState = true;
            }
        }

        // Update request
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
                    this.lock.inLock(async () => this.invalidate());
                }, 5000);
            }
        }
    }

    private invalidate() {
        if (this.closed) {
            return;
        }
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

        // Lock sequence
        this.mainSequence.lock();

        // Perform invalidation
        (async () => {
            // Perform difference
            let hasMore = true;
            while (hasMore) {

                // Get Difference
                let diff = await backoff(() => this.client
                    .queryGetDifference({ state: this.mainSequence.checkpoint!.state }));

                // Apply Difference
                await this.lock.inLock(async () => {
                    await this.persistence.inTx(async (tx) => {

                        // Apply sequences
                        for (let d of diff.updatesDifference.sequences) {
                            await this.handleSequenceDiffUpdate(tx, d.sequence.id, d.events);
                        }

                        // Apply remaining updates
                        let updates = this.mainSequence.onDifferenceReceived(tx,
                            diff.updatesDifference.seq, diff.updatesDifference.state);
                        for (let u of updates) {
                            await this.handleSequenceUpdate(tx, u.sequence.id, u.pts, u.event);
                        }
                    });
                });

                // Check if there are more
                hasMore = diff.updatesDifference.hasMore || this.isSubscribedWithGap();

                // Lock sequence
                if (hasMore) {
                    this.mainSequence.lock();
                }
            }

            // Mark as validated
            this.invalidated = false;
        })();
    }

    //
    // Subscription
    //

    private isSubscribedWithGap() {
        return this.subscribedFrom !== null && this.mainSequence.seq !== null && this.subscribedFrom > this.mainSequence.seq;
    }

    private async onSubscriptionStopped() {
        this.subscribedFrom = null;
    }

    private async onSubscriptionStarted(seq: number) {
        this.subscribedFrom = seq;

        // Invalidate if there is a sequence gap
        if (!this.invalidated) {
            if (this.isSubscribedWithGap()) {
                this.invalidate(); // Invalidate if we subscribed with gap
            }
        }
    }

    private async onSubscriptionEvent(event: EventContainer) {

        // Apply update
        await this.persistence.inTx(async (tx) => {

            // Invalidate if sequence is not loaded
            if (!this.sequences.hasSequence(tx, event.sequence.id)) {
                this.invalidate();
                return;
            }

            let drained = this.mainSequence.onReceive(event.seq, event);
            for (let d of drained) {
                await this.handleSequenceUpdate(tx, d.sequence.id, d.pts, d.event);
            }

            // Update invalidation request
            this.updateInvalidationRequest();
        });
    }

    private async onSubscriptionCheckpoint(seq: number, state: string) {
        await this.persistence.inTx(async (tx) => {
            this.mainSequence.onCheckpointReceived(tx, seq, state);
        });
    }

    //
    // Lifecycle
    //

    private async init() {

        // Load main sequence
        this.mainSequence = await MainSequenceState.open(this.persistence);
        this.sequences = await SequencesState.open(this.persistence);

        // Start subscription
        this.startSubscription();

        // Load initial state
        if (this.mainSequence.invalid) {
            console.log('updates: loading initial state');
            let updatesState = (await backoff(() => this.client.queryGetState({ fetchPolicy: 'network-only' }))).updatesState;
            if (this.closed) {
                return;
            }

            // Apply inital state and updates
            await this.lock.inLock(async () => {
                await this.persistence.inTx(async (tx) => {
                    let updates = this.mainSequence.onStateReceived(tx, updatesState.seq, updatesState.state);
                    for (let u of updates) {
                        await this.handleSequenceUpdate(tx, u.sequence.id, u.pts, u.event);
                    }
                });
            });
        }

        console.log('updates: inited');

        // Invalidate if subscribed with a gap
        await this.lock.inLock(async () => {
            if (!this.invalidated) {
                if (this.isSubscribedWithGap()) {
                    console.log('updates: invalidating: subscription is too new');
                    this.invalidate();
                }
            }
        });
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