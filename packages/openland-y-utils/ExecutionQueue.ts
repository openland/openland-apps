export class ExecutionQueue {
    private _queue: (() => any)[] = [];
    private _executing = false

    post = (action: () => any) => {
        this._queue.push(action);
        this._startIfNeeded();
    }

    sync = <T>(action: () => Promise<T>) => {
        return new Promise<T>((resolve, reject) => {
            this.post(async () => {
                try {
                    resolve(await action());
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    private _startIfNeeded = () => {
        if (this._executing) {
            return;
        }
        if (this._queue.length > 0) {
            this._executing = true;
            let action = this._queue.pop()!;
            (async () => {
                await null; // Always use next tick
                try {
                    await action();
                } finally {
                    this._executing = false;
                    this._startIfNeeded();
                }
            })();
        }
    }
}