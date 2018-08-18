export type WatchSubscription = () => void;
export class Watcher<T> {
    private _watchers: ((state: T) => void)[] = [];
    private _state?: T;

    watch(handler: (state: T) => void): WatchSubscription {
        this._watchers.push(handler);
        if (this._state) {
            handler(this._state);
        }
        return () => {
            let index = this._watchers.indexOf(handler);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this._watchers.splice(index, 1);
            }
        };
    }

    setState(state: T) {
        if (this._state !== state) {
            this._state = state;
            for (let w of this._watchers) {
                w(state);
            }
        }
    }
}