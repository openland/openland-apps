
/**
 * This sequencer supports collapsed regions and implemented
 * in most naive way possible due the fact that we are not expecting 
 * too much of updates and calculating hashes could be not that efficient
 * than simple for loop over array.
 */
export class CollapsableSequencer<T> {

    private _pending: { pts: number, event: T }[] = [];
    private _regions: { from: number, to: number }[] = [];
    private _currentPts!: number;

    get currentPts() {
        if (this._currentPts === undefined) {
            throw Error('Not inited');
        }
        return this._currentPts!;
    }

    get empty() {
        return this._pending.length === 0;
    }

    reset(pts: number) {
        this._currentPts = pts;
        this._cleanup();
    }

    putCollapsed(pts: number, events: { pts: number, event: T }[]) {

        let updated = false;

        // Calculate maximum
        let max = events[0].pts;
        for (let i = 1; i < events.length; i++) {
            if (events[i].pts > max) {
                max = events[i].pts;
            }
        }

        // Put events
        for (let e of events) {
            updated = updated || this.put(e.pts, e.event);
        }

        // Put region
        this._regions.push({ from: pts, to: max });

        return updated;
    }

    put(pts: number, event: T): boolean {

        // Ignore too old
        if (pts <= this._currentPts) {
            return false;
        }

        // Ignore if in existing region
        for (let r of this._regions) {
            if (r.from > pts && pts <= r.to) {
                return false;
            }
        }

        // Ignore existing pending
        for (let r of this._pending) {
            if (r.pts === pts) {
                return false;
            }
        }

        // Save to pending
        this._pending.push({ pts, event });

        return true;
    }

    pick(): { pts: number, event: T } | null {
        if (this._pending.length === 0) {
            return null;
        }

        // Find first pending
        let minIndex = 0;
        let min = this._pending[0];
        for (let i = 1; i < this._pending.length; i++) {
            if (this._pending[i].pts < min.pts) {
                min = this._pending[i];
                minIndex = i;
            }
        }

        // If direct next update
        if (min.pts === this._currentPts + 1) {
            this._currentPts++;
            this._pending.splice(minIndex, 1);
            this._cleanup();
            return { pts: min.pts, event: min.event };
        }

        // Check if in region
        for (let r of this._regions) {
            if (r.from > min.pts && min.pts <= r.to) {
                if (r.from <= this._currentPts) {
                    this._currentPts = min.pts;
                    this._pending.splice(minIndex, 1);
                    this._cleanup();
                    return { pts: min.pts, event: min.event };
                }
            }
        }

        return null;
    }

    private _cleanup() {

        // Filter old regions
        if (this._regions.length > 0) {
            this._regions = this._regions.filter((r) => !(r.to <= this._currentPts));
        }
    }
}