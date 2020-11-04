import { Transaction, Persistence } from './../../persistence/Persistence';
import { CollapsableSequencer } from './state/CollapsableSequencer';
import { UpdateEvent, UpdateSequenceDiff, UpdateSequenceState } from './../Types';
import { UpdatesApi } from './UpdatesApi';

export type SequenceSubscriptionEvent =
    | { type: 'invalidated' }
    | { type: 'validated' }
    | { type: 'restart', sequence: UpdateSequenceDiff, pts: number }
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
            this.invalidate();
        }
    }

    async onEvent(tx: Transaction, pts: number, event: UpdateEvent) {
        if (!this._started) {
            throw Error('Not started');
        }

        // Put pending and call handler
        if (this._pending.put(pts, event)) {
            if (this._started && !this._invalidated) {
                let drained = this.drain();
                for (let d of drained) {
                    this._handler!(tx, { type: 'event', event: d.event, pts: d.pts });
                }

                // Update invalidation timer
                this.stopInvalidationTimer();
                if (!this._pending.empty) {
                    this.startInvalidationTimer();
                }
            }
        }

        await this.updateInvalidatedState(tx);
    }

    async onDiff(tx: Transaction, fromPts: number, events: { pts: number, event: UpdateEvent }[], state: UpdateSequenceDiff) {
        if (!this._started) {
            throw Error('Not started');
        }

        if (this._pending.putCollapsed(fromPts, events)) {
            if (this._started && !this._invalidated) {

                let drained = this.drain();
                for (let d of drained) {
                    this._handler!(tx, { type: 'event', event: d.event, pts: d.pts });
                }

                // Update invalidation timer
                this.stopInvalidationTimer();
                if (!this._pending.empty) {
                    this.startInvalidationTimer();
                }
            }
        }

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
                this.invalidate();
            }, 5000);
        }
    }

    private invalidate() {
        if (this._invalidated) {
            return;
        }
        this._invalidated = true;

        // Getting difference
        (async () => {
            // Load difference
            let fromPts = this._pending.currentPts;
            let diff = await this._api.getSequenceDifference(this.id, fromPts);

            // Apply difference
            await this._persistence.inTx(async (tx) => {
                if (diff.events.length > 0) {
                    await this.onDiff(tx, fromPts, diff.events, diff.state);
                }

                // Stop invalidation
                this._invalidated = false;
                await this.updateInvalidatedState(tx);
            });
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