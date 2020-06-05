import { createPriorityQueue } from 'openland-y-utils/Queue';
export class ExecutionQueue {
    private readonly _queue = createPriorityQueue<{ action: () => Promise<any>, priority: number }>((v) => v.priority);
    private readonly _parallelism: number;
    private _active = 0;

    constructor(opts?: { parallelism?: number }) {
        if (opts && opts.parallelism !== undefined) {
            this._parallelism = opts.parallelism;
        } else {
            this._parallelism = 1;
        }
    }

    post = (action: () => Promise<any>, priority: number = 0) => {
        if (this._active < this._parallelism) {
            this._run(action);
        } else {
            this._queue.post({ action, priority });
        }
    }

    sync = <T>(action: () => Promise<T>, priority: number = 0) => {
        return new Promise<T>((resolve, reject) => {
            this.post(async () => {
                try {
                    resolve(await action());
                } catch (e) {
                    reject(e);
                }
            }, priority);
        });
    }

    private _run = (action: () => Promise<any>) => {
        this._active++;
        (async () => {
            try {
                await action();
            } finally {
                this._active--;
                this._scheduleNextIfNeeded();
            }
        })();
    }

    private _scheduleNextIfNeeded = () => {
        if (this._active >= this._parallelism) {
            return;
        }
        let task = this._queue.tryGetSync();
        if (task) {
            this._run(task.action);
        }
    }
}