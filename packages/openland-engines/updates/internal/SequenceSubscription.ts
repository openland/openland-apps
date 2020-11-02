import { CollapsableSequencer } from './state/CollapsableSequencer';
import { UpdateEvent } from './../Types';
import { Persistence } from 'openland-engines/persistence/Persistence';

export type SequenceSubscriptionEvent = { type: 'event', event: UpdateEvent, pts: number };

export type SequenceSubscriptionHandler = (event: SequenceSubscriptionEvent) => void;

export class SequenceSubscription {
    private readonly _id: string;
    private readonly _persistence: Persistence;
    private _knownPts!: number;
    private _started = false;
    private _invalidated = false;
    private _handler: SequenceSubscriptionHandler | null = null;
    private _stopped = false;

    // Sequence
    private _pending = new CollapsableSequencer<UpdateEvent>();

    constructor(id: string, state: { currentPts: number, knownPts: number }, persistence: Persistence) {
        this._id = id;
        this._pending.reset(state.currentPts);
        this._knownPts = state.knownPts;
        this._persistence = persistence;
    }

    start(handler: SequenceSubscriptionHandler) {
        // Save handler
        this._handler = handler;

        // Drain pending
        let drained = this.drain();
        for (let d of drained) {
            this._handler!({ type: 'event', event: d.event, pts: d.pts });
        }

        if (!this._pending.empty || this._knownPts > this._pending.currentPts) {
            // this.startInvalidationTimer();
        }

        this._started = true;
    }

    onEvent(pts: number, event: UpdateEvent) {

        // Update known pts
        this._knownPts = Math.max(pts, this._knownPts);

        // Put pending
        if (this._pending.put(pts, event)) {
            // this.stopInvalidationTimer();
            if (this._started && !this._invalidated) {
                let drained = this.drain();
                for (let d of drained) {
                    this._handler!({ type: 'event', event: d.event, pts: d.pts });
                }
            }
        }

        // Start invalidation timer
        if (this._started && !this._invalidated && !this._pending.empty) {
            // this.startInvalidationTimer();
        }
    }

    onCombinedEvent(fromPts: number, events: { pts: number, event: UpdateEvent }[]) {
        let max = events[0].pts;
        for (let e of events) {
            max = Math.max(e.pts, max);
        }

        if (this._pending.putCollapsed(fromPts, events)) {
            if (this._started && !this._invalidated) {
                let drained = this.drain();
                for (let d of drained) {
                    this._handler!({ type: 'event', event: d.event, pts: d.pts });
                }
            }
        }
    }

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