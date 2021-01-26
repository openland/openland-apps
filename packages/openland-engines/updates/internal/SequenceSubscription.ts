import { Transaction, Persistence } from './../../persistence/Persistence';
import { CollapsableSequencer } from './state/CollapsableSequencer';
import { UpdateEvent, UpdateSequenceDiff, UpdateSequenceState } from './../Types';
import { UpdatesApi } from './UpdatesApi';
import { LOG } from './LOG';

export type SequenceSubscriptionEvent =
    | { type: 'invalidated' }
    | { type: 'validated' }
    | { type: 'restart', sequence: UpdateSequenceDiff, pts: number, lost: boolean }
    | { type: 'event', event: UpdateEvent, pts: number };

export type SequenceSubscriptionHandler = (tx: Transaction, event: SequenceSubscriptionEvent) => Promise<void>;

export class SequenceSubscription {
    readonly id: string;
    private _api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>;
    private _persistence: Persistence;
    private _started = false;
    private _invalidated = false;
    private _invalidationNeeded = false;
    private _handler: SequenceSubscriptionHandler | null = null;
    private _pending = new CollapsableSequencer<UpdateEvent>();
    private _invalidationTimer: any | null = null;

    constructor(id: string, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>, persistence: Persistence) {
        this.id = id;
        this._api = api;
        this._persistence = persistence;
    }

    start(startPts: number, startInvalidated: boolean, handler: SequenceSubscriptionHandler) {
        if (this._started) {
            throw Error('Already started');
        }

        // Save handler
        this._handler = handler;
        this._pending.reset(startPts);
        this._started = true;

        // Invalidate if needed
        if (startInvalidated) {
            this._invalidationNeeded = true;
            this.doInvalidate();
        }
    }

    async onEvent(tx: Transaction, pts: number, event: UpdateEvent) {
        if (!this._started) {
            throw Error('Not started');
        }
        if (LOG) {
            console.log('[updates]: ' + this.id + ': event: ', { pts, event });
        }

        // Put pending and call handler
        if (this._pending.put(pts, event)) /* if 'event was added' */ {
            console.log('[updates]: ' + this.id + ': Added');

            let drained = this.drain();
            for (let d of drained) {
                await this._handler!(tx, { type: 'event', event: d.event, pts: d.pts });
            }

            // Update invalidation timer if not in process of invalidation
            if (!this._invalidated) {
                this.stopInvalidationTimer();
                if (!this._pending.empty) {
                    this.startInvalidationTimer();
                }
            }
        } else {
            console.log('[updates]: ' + this.id + ': Ignored');
        }

        await this.updateInvalidatedState(tx);
    }

    async onDiff(tx: Transaction, fromPts: number, toPts: number, events: { pts: number, event: UpdateEvent }[], state: UpdateSequenceDiff) {
        if (!this._started) {
            throw Error('Not started');
        }

        if (LOG) {
            console.log('[updates]: ' + this.id + ': diff: ', { fromPts, toPts, events, state });
        }

        if (this._invalidated) {
            // If invalidated casually try to apply updates if possible
            this._pending.putCollapsed(fromPts, toPts, events);

            // Drain pending updates
            let drained = this.drain();
            for (let d of drained) {
                await this._handler!(tx, { type: 'event', event: d.event, pts: d.pts });
            }
        } else {

            // If not invalidated: try to apply updates if possible and handle stream restart if happens
            if (this._pending.currentPts < fromPts) {
                if (LOG) {
                    console.log('[updates]: ' + this.id + ':restart from ' + this._pending.currentPts + ' -> ' + toPts);
                }

                // Reset pending collection
                this._pending.reset(toPts);
                await this._handler!(tx, { type: 'restart', sequence: state, pts: toPts, lost: true });
            } else {
                // Put to pending collection (to be drained soon)
                this._pending.putCollapsed(fromPts, toPts, events);
            }

            if (LOG) {
                console.log('[updates]: ' + this.id + ':state: ', this._pending.dump());
            }

            // Drain pending updates
            let drained = this.drain();
            for (let d of drained) {
                await this._handler!(tx, { type: 'event', event: d.event, pts: d.pts });
            }

            // Update invalidation timer if not invalidating already
            this.stopInvalidationTimer();
            if (!this._pending.empty) {
                this.startInvalidationTimer();
            }
        }

        await this.updateInvalidatedState(tx);
    }

    async invalidate(tx: Transaction) {
        if (this._invalidated) {
            return;
        }
        this.doInvalidate();

        await this.updateInvalidatedState(tx);
    }

    //
    // Invalidation
    //

    private async updateInvalidatedState(tx: Transaction) {
        if (this._started) {
            let invalid = this._invalidated || !this._pending.empty;
            if (invalid !== this._invalidationNeeded) {
                this._invalidationNeeded = invalid;
                if (invalid) {
                    await this._handler!(tx, { type: 'invalidated' });
                } else {
                    await this._handler!(tx, { type: 'validated' });
                }
            }
        }
    }

    private stopInvalidationTimer() {
        if (this._invalidationTimer) {
            clearTimeout(this._invalidationTimer);
            this._invalidationTimer = null;
        }
    }

    private startInvalidationTimer() {
        if (!this._invalidationTimer) {
            this._invalidationTimer = setTimeout(() => {
                this._persistence.inTx(async (tx) => { // TODO: Avoid transaction
                    this.doInvalidate();
                });
            }, 5000);
        }
    }

    private doInvalidate() {
        if (this._invalidated) {
            return;
        }
        this._invalidated = true;

        // Stop timer
        this.stopInvalidationTimer();

        // Getting difference
        (async () => {

            let hasMore = true;
            while (hasMore) {

                // Load difference
                let fromPts = this._pending.currentPts;
                let diff = await this._api.getSequenceDifference(this.id, fromPts);
                hasMore = diff.hasMore;

                // Apply difference
                await this._persistence.inTx(async (tx) => {

                    // If stream was reset
                    if (diff.events.length > 0) {
                        let toPts = diff.events[0].pts;
                        for (let e of diff.events) {
                            toPts = Math.max(e.pts);
                        }

                        if (this._pending.currentPts < diff.pts) {
                            // Reset stream
                            this._pending.reset(toPts);
                            await this._handler!(tx, { type: 'restart', sequence: diff.state, pts: toPts, lost: true });
                        } else {
                            // Put to pending
                            this._pending.putCollapsed(diff.pts, toPts, diff.events);
                        }

                        // Drain pending updates
                        let drained = this.drain();
                        for (let d of drained) {
                            await this._handler!(tx, { type: 'event', event: d.event, pts: d.pts });
                        }
                    }

                    // Complete invalidation
                    if (!hasMore) {
                        this._invalidated = false;
                        await this.updateInvalidatedState(tx);

                        // Notify restart
                        await this._handler!(tx, { type: 'restart', pts: diff.pts, sequence: diff.state, lost: false });

                        // Start invalidation timer if there are some empty updates
                        if (!this._pending.empty) {
                            this.startInvalidationTimer();
                        }
                    }
                });
            }
        })();
    }

    //
    // Utils
    //

    private drain() {
        let res: { pts: number, event: UpdateEvent }[] = [];
        let picked = this._pending.pick();
        while (picked) {
            res.push(picked);
            picked = this._pending.pick();
        }
        return res;
    }
}