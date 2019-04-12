export class ExecutionQueue {
    private _queue: (() => any)[] = [];
    private _executing = false

    post = (action: () => any) => {
        this._queue.push(action);
        this._startIfNeeded();
    }

    private _startIfNeeded = () => {
        if (this._executing) {
            return;
        }
        if (this._queue.length > 0) {
            this._executing = true;
            let action = this._queue.pop();
            (async () => {
                await null; // Always use next tick
                try {
                    await action;
                } finally {
                    this._executing = false;
                    this._startIfNeeded();
                }
            })();
        }
    }
}