import { ExecutionQueue } from './ExecutionQueue';

export class InvalidationQueue {
    private readonly _action: () => any;
    private readonly _queue = new ExecutionQueue();
    private _invalidating = false;
    private _invalidatedSecondary = false;

    constructor(action: () => any) {
        this._action = action;
    }

    invalidate = () => {
        if (this._invalidating) {
            if (!this._invalidatedSecondary) {
                this._invalidatedSecondary = true;
                this._queue.post(this._doInvalidate);
            }
        } else {
            this._invalidating = true;
            this._invalidatedSecondary = false;
            this._queue.post(this._doInvalidate);
        }
    }

    private _doInvalidate = async () => {
        try {
            await this._action();
        } finally {
            if (!this._invalidatedSecondary) {
                this._invalidating = false;
            }
            this._invalidatedSecondary = false;
        }
    }
}