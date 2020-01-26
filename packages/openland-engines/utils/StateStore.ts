import * as React from 'react';

export class StateStore<T> {
    private state!: T;
    private inited = false;
    private promise: Promise<void>;
    private promiseResolver!: () => void;
    private _stateSubscriptions: ((state: T) => void)[] = [];

    constructor() {
        this.promise = new Promise((resolver) => this.promiseResolver = resolver);
    }

    get = () => {
        if (!this.inited) {
            throw Error('');
        }
        return this.state;
    }

    setState = (state: T) => {
        this.state = state;
        if (!this.inited) {
            this.inited = true;
            this.promiseResolver();
        }
        for (let f of this._stateSubscriptions) {
            f(state);
        }
    }

    useState = () => {

        // Throw promise
        if (!this.inited) {
            throw this.promise;
        }

        // State
        let [res, setRes] = React.useState(this.state);

        // Subscribe
        React.useEffect(() => {
            this._stateSubscriptions.push(setRes);
            return () => {
                let ind = this._stateSubscriptions.indexOf(setRes);
                if (ind >= 0) {
                    this._stateSubscriptions.splice(ind, 1);
                }
            };
        }, []);

        return res;
    }
}