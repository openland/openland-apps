export class SQueue {
    private _queue: (() => Promise<void>)[] = [];
    private _isWorking = false;

    push = (work: () => Promise<void>) => {
        this._queue.unshift(work);
        if (!this._isWorking) {
            this._isWorking = true;
            setTimeout(this.tryDoWork, 1);
        }
    }

    private tryDoWork = async () => {
        if (this._queue.length >= 1) {
            let work = this._queue.pop()!;
            (async () => {
                try {
                    await work();
                } catch (e) {
                    console.warn(e);
                } finally {
                    this.tryDoWork();
                }
            })();
        } else {
            this._isWorking = false;
        }
    }
}