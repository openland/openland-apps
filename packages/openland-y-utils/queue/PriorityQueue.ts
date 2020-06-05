import { PairingHeap } from './heap/PairingHeap';
import { QueueEngine } from './QueueEngine';

export class PriorityQueue<T> implements QueueEngine<T> {
    private _priority: (v: T) => number;
    private _heap = new PairingHeap<T>();

    constructor(priority: (v: T) => number) {
        this._priority = priority;
    }

    get size() {
        return this._heap.count;
    }

    pop = (): T | undefined => {
        return this._heap.pop();
    }

    push = (value: T) => {
        this._heap.push(value, this._priority(value));
    }
}