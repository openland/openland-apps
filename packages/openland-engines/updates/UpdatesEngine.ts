import { MainSequenceState } from './state/MainSequenceState';
import { Transaction } from './../persistence/Persistence';
import { AsyncLock } from '@openland/patterns';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/spacex';
import { WatchUpdates, WatchUpdates_watchUpdates_UpdateSubscriptionEvent, GetState } from 'openland-api/spacex.types';
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
    private invalidated = false;
    private subscribedFrom: number | null = null;
    private sequence!: MainSequenceState<EventContainer>;

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
    // Handlers
    //

    private async handleNewSequence(tx: Transaction, sequence: string, pts: number) {
        console.warn('updates: new sequence ', { sequence, pts });
        // TODO: Handle
    }

    private async handleCombinedUpdate(tx: Transaction, sequence: string, after: number, events: { pts: number, event: Event }[]) {
        console.warn('updates: diff ', { sequence, after, events });
        // TODO: Handle
    }

    private async handleUpdate(tx: Transaction, sequence: string, pts: number, event: Event) {
        console.warn('updates: update ', { sequence, pts, event });
        // TODO: Handle
    }

    //
    // Invalidation
    //

    private updateInvalidationRequest() {
        if (this.invalidated) {
            return;
        }

        // Check if state is invalid
        let invalidState = this.sequence.invalid;

        console.warn('update: invalidState: ' + invalidState);

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
        this.sequence.lock();

        // Perform invalidation
        (async () => {
            // Perform difference
            let hasMore = true;
            while (hasMore) {
                hasMore = await this.lock.inLock(async () => {
                    console.log('updates: loading diff...');

                    // Get Difference
                    let diff = await backoff(() => this.client
                        .queryGetDifference({ state: this.sequence.checkpoint!.state }));

                    console.log('updates: diff', diff);

                    // Apply Difference

                    await this.persistence.inTx(async (tx) => {

                        // Apply sequences
                        for (let d of diff.updatesDifference.sequences) {
                            await this.handleCombinedUpdate(tx, d.sequence.id, d.after, d.events);
                        }

                        // Apply remaining updates
                        let updates = this.sequence.onDifferenceReceived(tx,
                            diff.updatesDifference.seq, diff.updatesDifference.state);
                        for (let u of updates) {
                            await this.handleUpdate(tx, u.sequence.id, u.pts, u.event);
                        }
                    });

                    let r =  diff.updatesDifference.hasMore || this.isSubscribedWithGap();

                    // Re-lock sequence
                    if (r) {
                        this.sequence.lock();
                    }

                    return r;
                });
            }

            // Mark as validated
            this.invalidated = false;
        })();
    }

    //
    // Updates
    //

    private async onStateLoaded(state: GetState) {
        await this.lock.inLock(async () => {
            let updatesState = state.updatesState;
            await this.persistence.inTx(async (tx) => {

                // Apply new sequences
                for (let sequence of updatesState.sequences) {
                    await this.handleNewSequence(tx, sequence.sequence.id, sequence.pts);
                }

                let updates = this.sequence.onStateReceived(tx, updatesState.seq, updatesState.state);
                for (let u of updates) {
                    await this.handleUpdate(tx, u.sequence.id, u.pts, u.event);
                }
            });
        });
    }

    private async onSubscriptionStopped() {
        await this.lock.inLock(async () => {
            this.subscribedFrom = null;
        });
    }

    private async onSubscriptionStarted(seq: number) {
        console.log('updates: subscription started at ' + seq);

        await this.lock.inLock(async () => {
            this.subscribedFrom = seq;

            // Invalidate if there is a sequence gap
            if (!this.invalidated) {
                if (this.isSubscribedWithGap()) {
                    this.invalidate(); // Invalidate if we subscribed with gap
                }
            }
        });
    }

    private async onSubscriptionEvent(event: EventContainer) {
        console.log('updates: receive event', event);

        // Apply update
        await this.lock.inLock(async () => {
            await this.persistence.inTx(async (tx) => {

                // Receive updates
                let drained = this.sequence.onReceive(event.seq, event);
                for (let d of drained) {
                    await this.handleUpdate(tx, d.sequence.id, d.pts, d.event);
                }

                // Update invalidation request
                console.warn('update: invalidation request');
                this.updateInvalidationRequest();
            });
        });
    }

    private async onSubscriptionCheckpoint(seq: number, state: string) {
        await this.lock.inLock(async () => {
            await this.persistence.inTx(async (tx) => {
                this.sequence.onCheckpointReceived(tx, seq, state);
            });
        });
    }

    private isSubscribedWithGap() {
        return this.subscribedFrom !== null && this.sequence.seq !== null && this.subscribedFrom > this.sequence.seq;
    }

    private async init() {

        // Load sequence
        this.sequence = await MainSequenceState.open(this.persistence);

        // Load initial state if needed
        // NOTE: Invalid state at the start could be ONLY when there 
        //       are no state at all
        if (this.sequence.invalid) {
            console.log('updates: loading initial state');
            let updatesState = (await backoff(() => this.client.queryGetState({ fetchPolicy: 'network-only' })));
            if (this.closed) {
                return;
            }
            await this.onStateLoaded(updatesState);
        }

        // Start subscription
        this.startSubscription();

        console.log('updates: inited');
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
                this.onSubscriptionStopped();
            } else if (e.type === 'message') {
                if (e.message.watchUpdates.__typename === 'UpdateSubscriptionStarted') {
                    const update = e.message.watchUpdates;
                    this.onSubscriptionStarted(update.seq);
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionEvent') {
                    const update = e.message.watchUpdates;
                    this.onSubscriptionEvent(update);
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionCheckpoint') {
                    const update = e.message.watchUpdates;
                    this.onSubscriptionCheckpoint(update.seq, update.state);
                }
            }
        });
    }
}