import { UpdatesSubscription, UpdatesSubscriptionEvent } from './UpdatesSubscription';
import { UpdatesApi } from './UpdatesApi';

export type MainUpdatesSubscriptionEvent<T> =
    | { type: 'inited', vt: string }
    | { type: 'event', vt: string, sequence: string, pts: number, event: T }
    | { type: 'events-combined', vt: string, sequence: string, fromPts: number, events: { pts: number, event: T }[] }
    | { type: 'checkpoint', vt: string }
    | { type: 'state', state: MainUpdatesState };
export type MainUpdatesSubscriptionHandler<T> = (event: MainUpdatesSubscriptionEvent<T>) => void;

export type MainUpdatesState = 'inited' | 'starting' | 'connected' | 'connecting' | 'updating' | 'stopped';

export class MainUpdatesSubscription<T> {

    private readonly api: UpdatesApi<T>;
    private readonly subscription: UpdatesSubscription<T>;
    private _currentSeq!: number;
    private _subscribedFrom: number | null = null;
    private _vt!: string;
    private _vtSeq!: number;
    private _launched = false;
    private _started = false;
    private _stopped = false;
    private _invalidated = false;
    private _invalidationTimer: any | null = null;
    private _pending = new Map<number, { sequence: string, pts: number, event: T }>();
    private _handler: MainUpdatesSubscriptionHandler<T> | null = null;
    private _state: MainUpdatesState = 'inited';

    constructor(
        vt: string | null,
        api: UpdatesApi<T>,
        subscription: UpdatesSubscription<T>
    ) {
        if (vt) {
            this._vt = vt;
        }
        this.api = api;
        this.subscription = subscription;
    }

    start = (handler: MainUpdatesSubscriptionHandler<T>) => {
        if (this._launched) {
            throw Error('Already launched');
        }
        this._launched = true;

        this._handler = handler;
        this.setState('starting');
        this.init();
    }

    stop = () => {
        if (!this._launched) {
            throw Error('Not launched');
        }
        if (this._stopped) {
            throw Error('Already stopped');
        }
        this._stopped = true;
        this.setState('stopped');
        this.subscription.stop();
        this._handler = null;
    }

    private setState(state: MainUpdatesState) {
        if (this._state !== state) {
            this._state = state;
            this._handler!({ type: 'state', state: state });
        }
    }

    private init = async () => {
        this.subscription.start(this.onReceive);
        this.setState('connecting');

        // Load initial state
        if (!this._vt) {
            // Load Initial State
            let state = await this.api.getState();
            this._vt = state.vt;
            this._vtSeq = state.seq;
            this._currentSeq = state.seq;

            // Call handler
            if (this._subscribedFrom !== null) {
                this.setState('connected');
            }
            this._handler!({ type: 'inited', vt: this._vt });
        } else {

            // Load Difference
            let difference = await this.api.getDifference(this._vt);
            this._vt = difference.vt;
            this._vtSeq = difference.seq;
            this._currentSeq = difference.seq;

            // Call handler
            if (this._subscribedFrom !== null) {
                this.setState('connected');
            }
            for (let sequence of difference.sequences) {
                this._handler!({
                    type: 'events-combined',
                    vt: this._vt,
                    sequence: sequence.sequence,
                    fromPts: sequence.fromPts,
                    events: sequence.events
                });
            }
        }

        // Delete old pending events
        this.deleteOld();

        // Drain received events
        let drained = this.drain();
        for (let d of drained) {
            this._handler!({ type: 'event', vt: this._vt!, sequence: d.sequence, pts: d.pts, event: d.event });
        }

        // Request invalidation timeout if there are already pending exists
        if (this._pending.size > 0) {
            this.startInvalidationTimer();
        }

        // Start normal event processing
        this._started = true;

        // Invalidate if subscribed with a gap
        this.checkSubsciptionGap();
    }

    private onReceive = (event: UpdatesSubscriptionEvent<T>) => {
        if (event.type === 'event') {

            // Ignore too old updates
            if (this._currentSeq !== undefined && event.seq <= this._currentSeq) {
                return;
            }

            // If not started or invalidated - put all to pending
            if (!this._started || this._invalidated) {
                this._pending.set(event.seq, { sequence: event.sequence, pts: event.pts, event: event.event });
                return;
            }

            if (this._currentSeq + 1 === event.seq) {

                // Handle update
                this._currentSeq++;
                this._handler!({
                    type: 'event',
                    vt: this._vt!,
                    sequence: event.sequence,
                    pts: event.pts,
                    event: event.event
                });

                // Drain pending
                let drained = this.drain();
                for (let d of drained) {
                    this._handler!({ type: 'event', vt: this._vt!, sequence: d.sequence, pts: d.pts, event: d.event });
                }

                // Restart invalidation timer
                this.stopInvalidationTimer();
                if (drained.length > 0) {
                    this.startInvalidationTimer();
                }
            } else {
                // Persist to pending
                this._pending.set(event.seq, { sequence: event.sequence, pts: event.pts, event: event.event });

                // Start invalidation timer if not exist
                this.startInvalidationTimer();
            }
        } else if (event.type === 'started') {
            this._subscribedFrom = event.seq;
            this.checkSubsciptionGap();
            if (this._started && !this._invalidated) {
                this.setState('connected');
            }
        } else if (event.type === 'stopped') {
            this._subscribedFrom = null;

        } else if (event.type === 'checkpoint') {

            // Return not started or invalidated
            if (!this._started || this._invalidated) {
                return;
            }

            // Handle vt
            if (event.seq < this._currentSeq && this._vtSeq < event.seq) {
                this._vt = event.checkpoint;
                this._vtSeq = event.seq;
                this._handler!({ type: 'checkpoint', vt: this._vt });
            }
        }
    }

    private checkSubsciptionGap = () => {
        if (this._subscribedFrom !== null && this._started && !this._invalidated) {
            if (this._currentSeq < this._subscribedFrom) {
                this.invalidate();
            }
        }
    }

    private invalidate = () => {
        if (this._invalidated) {
            return;
        }
        this._invalidated = true;
        this.setState('updating');

        (async () => {
            let hasMore = true;
            while (hasMore) {
                let difference = await this.api.getDifference(this._vt);
                this._currentSeq = difference.seq;
                this._vt = difference.vt;
                this._vtSeq = difference.seq;

                // Call handler
                for (let sequence of difference.sequences) {
                    this._handler!({
                        type: 'events-combined',
                        vt: this._vt,
                        sequence: sequence.sequence,
                        fromPts: sequence.fromPts,
                        events: sequence.events
                    });
                }

                // Handle retry
                hasMore = difference.hasMore;
            }

            // Delete old pending events
            this.deleteOld();

            // Drain received events
            let drained = this.drain();
            for (let d of drained) {
                this._handler!({ type: 'event', vt: this._vt!, sequence: d.sequence, pts: d.pts, event: d.event });
            }

            // Update state
            if (this._subscribedFrom !== null) {
                this.setState('connected');
            } else {
                this.setState('connecting');
            }

            // Update invalidated flag
            this._invalidated = false;

            // Check if there are some subscription gap
            this.checkSubsciptionGap();
        })();
    }

    private startInvalidationTimer = () => {
        if (!this._invalidationTimer) {
            this._invalidationTimer = setTimeout(this.invalidate, 5000);
        }
    }

    private stopInvalidationTimer = () => {
        if (this._invalidationTimer) {
            clearTimeout(this._invalidationTimer);
            this._invalidationTimer = null;
        }
    }

    private deleteOld() {
        if (this._currentSeq === undefined) {
            throw Error('Invalid state');
        }
        for (let k of [...this._pending.keys()]) {
            if (k <= this._currentSeq) {
                this._pending.delete(k);
            }
        }
    }

    private drain() {
        if (this._currentSeq === undefined) {
            throw Error('Invalid state');
        }
        let res: { sequence: string, pts: number, event: T }[] = [];
        while (this._pending.has(this._currentSeq + 1)) {
            res.push(this._pending.get(this._currentSeq + 1)!);
            this._currentSeq++;
        }
        return res;
    }
}