import { AsyncLock } from '@openland/patterns';
import { UpdatesSubscription, UpdatesSubscriptionEvent } from './UpdatesSubscription';
import { UpdatesApi } from './UpdatesApi';
import { LOG } from '../LOG';

export type MainUpdatesSubscriptionEvent<T, STATE, DIFF> =
    | { type: 'inited', vt: string }
    | { type: 'start', vt: string, state: STATE, pts: number }
    | { type: 'event', vt: string, id: string, pts: number, event: T }
    | { type: 'diff', vt: string, state: DIFF, fromPts: number, events: { pts: number, event: T }[] }
    | { type: 'state', state: MainUpdatesState };
export type MainUpdatesSubscriptionHandler<T, STATE, DIFF> = (event: MainUpdatesSubscriptionEvent<T, STATE, DIFF>) => void;

export type MainUpdatesState = 'inited' | 'starting' | 'connected' | 'connecting' | 'updating' | 'stopped';

export class MainUpdatesSubscription<T, STATE extends { id: string }, DIFF extends { id: string }> {

    private readonly api: UpdatesApi<T, STATE, DIFF>;
    private readonly subscription: UpdatesSubscription<T>;
    private readonly queue = new AsyncLock();
    private _currentSeq!: number;
    private _subscribedFrom: number | null = null;
    private _vt!: string;
    private _launched = false;
    private _started = false;
    private _stopped = false;
    private _invalidated = false;
    private _invalidationTimer: any | null = null;
    private _pending = new Map<number, { sequence: string, pts: number, vt: string, event: T }>();
    private _handler: MainUpdatesSubscriptionHandler<T, STATE, DIFF> | null = null;
    private _state: MainUpdatesState = 'inited';
    private _preprocessor: (src: any) => Promise<void>;

    constructor(
        api: UpdatesApi<T, STATE, DIFF>,
        subscription: UpdatesSubscription<T>,
        preprocessor: (src: any) => Promise<void>
    ) {
        this._preprocessor = preprocessor;
        this.api = api;
        this.subscription = subscription;
    }

    start = (vt: string | null, handler: MainUpdatesSubscriptionHandler<T, STATE, DIFF>) => {
        if (this._launched) {
            throw Error('Already launched');
        }
        if (vt) {
            this._vt = vt;
        }
        this._launched = true;

        this._handler = handler;
        this.setState('starting');
        if (LOG) {
            console.log('[updates]: Start main updates...');
        }
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
        this.subscription.start((e) => {
            this.queue.inLock(async () => {
                await this.onReceive(e);
            });
        });
        this.setState('connecting');

        // Load initial state
        if (!this._vt) {
            // Load Initial State
            let state = await this.api.getState();

            this._vt = state.vt;
            this._currentSeq = state.seq;

            // Call handler
            if (this._subscribedFrom !== null) {
                this.setState('connected');
            }
            this._handler!({ type: 'inited', vt: this._vt });
            for (let s of state.sequences) {
                this._handler!({ type: 'start', vt: this._vt, state: s.state, pts: s.pts });
            }
        } else {

            // Load Difference
            let difference = await this.api.getDifference(this._vt);

            this._vt = difference.vt;
            this._currentSeq = difference.seq;

            // Call handler
            if (this._subscribedFrom !== null) {
                this.setState('connected');
            }
            for (let sequence of difference.sequences) {
                this._handler!({
                    type: 'diff',
                    vt: difference.vt,
                    state: sequence.state,
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
            this._vt = d.vt;
            this._handler!({ type: 'event', vt: d.vt, id: d.sequence, pts: d.pts, event: d.event });
        }

        // Request invalidation timeout if there are already pending exists
        if (this._pending.size > 0) {
            this.startInvalidationTimer();
        }

        // Start normal event processing
        this._started = true;
        if (LOG) {
            console.log('[updates]: Started');
        }

        // Invalidate if subscribed with a gap
        this.checkSubsciptionGap();
    }

    private onReceive = async (event: UpdatesSubscriptionEvent<T>) => {
        await this._preprocessor(event);

        if (event.type === 'event') {

            if (LOG) {
                console.log('[updates]: Received: ', event);
            }

            // Ignore too old updates
            if (this._currentSeq !== undefined && event.seq <= this._currentSeq) {
                if (LOG) {
                    console.log('[updates]: Ignored: too old');
                }
                return;
            }

            // If not started or invalidated - put all to pending
            if (!this._started || this._invalidated) {
                if (!this._pending.has(event.seq)) {
                    this._pending.set(event.seq, { sequence: event.sequence, vt: event.vt, pts: event.pts, event: event.event });
                }
                if (LOG) {
                    console.log('[updates]: Pending: invalidated');
                }
                return;
            }

            if (this._currentSeq + 1 === event.seq) {

                if (LOG) {
                    console.log('[updates]: Processing');
                }

                // Handle update
                this._currentSeq++;
                this._vt = event.vt;
                this._handler!({
                    type: 'event',
                    vt: event.vt,
                    id: event.sequence,
                    pts: event.pts,
                    event: event.event
                });

                // Drain pending
                let drained = this.drain();
                for (let d of drained) {
                    this._vt = event.vt;
                    this._handler!({ type: 'event', vt: d.vt, id: d.sequence, pts: d.pts, event: d.event });
                }

                // Restart invalidation timer
                this.stopInvalidationTimer();
                if (drained.length > 0) {
                    this.startInvalidationTimer();
                }
            } else {
                if (LOG) {
                    console.log('[updates]: Pending: from the future');
                }
                if (!this._pending.has(event.seq)) {
                    // Persist to pending
                    this._pending.set(event.seq, { sequence: event.sequence, pts: event.pts, event: event.event, vt: event.vt });

                    // Start invalidation timer if not exist
                    this.startInvalidationTimer();
                }
            }
        } else if (event.type === 'started') {
            if (LOG) {
                console.log('[updates]: connection started at ' + event.seq);
            }
            this._subscribedFrom = event.seq;
            this.checkSubsciptionGap();
            if (this._started && !this._invalidated) {
                this.setState('connected');
            }
        } else if (event.type === 'stopped') {
            this._subscribedFrom = null;
            if (LOG) {
                console.log('[updates]: subscription stopped at ' + this._currentSeq);
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
        if (LOG) {
            console.log('[updates]: Invalidating...');
        }

        (async () => {
            let hasMore = true;
            while (hasMore) {
                let difference = await this.api.getDifference(this._vt);
                this._currentSeq = difference.seq;
                this._vt = difference.vt;

                // Call handler
                for (let sequence of difference.sequences) {
                    this._handler!({
                        type: 'diff',
                        vt: difference.vt,
                        state: sequence.state,
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
                this._handler!({ type: 'event', vt: d.vt, id: d.sequence, pts: d.pts, event: d.event });
            }

            // Update state
            if (this._subscribedFrom !== null) {
                this.setState('connected');
            } else {
                this.setState('connecting');
            }

            if (LOG) {
                console.log('[updates]: Valid');
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
        let res: { sequence: string, pts: number, vt: string, event: T }[] = [];
        while (this._pending.has(this._currentSeq + 1)) {
            res.push(this._pending.get(this._currentSeq + 1)!);
            this._currentSeq++;
        }
        return res;
    }
}