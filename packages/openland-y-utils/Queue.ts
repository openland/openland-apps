import { PriorityQueue } from './queue/PriorityQueue';
import { FIFOQueue } from './queue/FIFOQueue';
import { QueueEngine } from './queue/QueueEngine';

export class Queue<T> {
    private _pending = new FIFOQueue<(src: T) => void>();
    private _engine: QueueEngine<T>;

    constructor(engine: QueueEngine<T>) {
        this._engine = engine;
    }

    get size() {
        return this._engine.size;
    }

    get = async () => {
        if (this._engine.size > 0) {
            return this._engine.pop();
        } else {
            return await new Promise<any>((resolver) => this._pending.push(resolver));
        }
    }

    tryGetSync = () => {
        return this._engine.pop();
    }

    post = (src: T) => {
        if (this._pending.size > 0) {
            let pend = this._pending.pop()!;
            pend(src);
        } else {
            this._engine.push(src);
        }
    }
}

export function createFifoQueue<T>() {
    return new Queue<T>(new FIFOQueue<T>());
}

export function createPriorityQueue<T>(priority: (v: T) => number) {
    return new Queue<T>(new PriorityQueue(priority));
}