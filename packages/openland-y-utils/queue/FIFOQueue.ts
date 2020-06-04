import { QueueEngine } from './QueueEngine';

export class FIFOQueue<T> implements QueueEngine<T> {
    private queue: T[] = [];

    get size() {
        return this.queue.length;
    }

    push(src: T) {
        if (src === undefined) {
            throw Error('Value couldn\'t be undefined. Use null instead.');
        }
        this.queue.push(src);
    }

    pop() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        } else {
            return undefined;
        }
    }
}