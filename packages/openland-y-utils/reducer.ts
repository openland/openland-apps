import * as React from 'react';

export class Reducer<T, C> {
    private _state: T;
    private _reducer: (src: T, command: C) => T;
    private _listeners = new Set<(state: T) => void>();

    constructor(reducer: (src: T, command: C) => T, initial: T) {
        this._state = initial;
        this._reducer = reducer;
    }

    get value() {
        return this._state;
    }

    useValue() {
        let [state, setState] = React.useState(this._state);
        React.useEffect(() => {
            if (state !== this._state) {
                setState(state);
            }
            this._listeners.add(setState);
            return () => {
                this._listeners.delete(setState);
            };
        }, []);
        return state;
    }

    dispatch(src: C) {
        this._state = this._reducer(this._state, src);
        let s = this._state;
        for (let l of [...this._listeners]) {
            l(s);
        }
    }
}