export class Sequencer<T> {
    private _counter: number = -1;
    private _pending = new Map<number, T>();

    get counter() {
        if (this._counter < 0) {
            return null;
        }
        return this._counter;
    }

    reset(counter: number) {
        this._counter = counter;
        this.cleanup();
    }

    receive(counter: number, value: T) {
        if ((this._counter < 0 || this._counter < counter) && (!this._pending.has(counter))) {
            this._pending.set(counter, value);
        }
    }

    get hasPending(): boolean {
        return this._pending.size > 0;
    }

    drain(): T[] {
        let res: T[] = [];
        if (this._counter < 0) {
            return res;
        }

        // Drain pending
        while (this._pending.has(this._counter! + 1)) {
            let e = this._pending.get(this._counter! + 1)!;
            this._pending.delete(this._counter! + 1);
            this._counter!++;
            res.push(e);
        }

        return res;
    }

    drainAllTo(counter: number): T[] {
        let res: T[] = [];
        let sortedKeys = [...this._pending.keys()].sort();
        for (let s of sortedKeys) {
            if (s <= counter) {
                res.push(this._pending.get(s)!);
                this._pending.delete(s);
            }
        }
        this.reset(counter);
        return res;
    }

    private cleanup() {
        for (let k of [...this._pending.keys()]) {
            if (k <= this._counter!) {
                this._pending.delete(k);
            }
        }
    }
}