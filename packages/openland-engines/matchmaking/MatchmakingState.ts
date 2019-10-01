import * as React from 'react';

export interface MatchmakingState {
    answers: Map<string, string[] | string>;
}

export class MatchmakingEngine {
    private state: MatchmakingState = { answers: new Map() };
    private listeners = new Set<(state: MatchmakingState) => void>();

    ////
    // Actions
    ////

    setAnswer = (answers: Map<string, string[] | string>) => {
        this.setState({ answers: answers });
    }

    clear = () => {
        this.state = { answers: new Map() };
        this.notifyAll();
    }

    ////
    // IO
    ////

    listen = (listener: (state: MatchmakingState) => void) => {
        this.listeners.add(listener);
        listener(this.state);
        return () => {
            this.listeners.delete(listener);
        };
    }

    getState = () => {
        return this.state;
    }

    useState = () => {
        let [state, setState] = React.useState(this.state);
        React.useEffect(() => {
            return this.listen(s => {
                setState(s);
            });
        }, []);
        return state;
    }

    ////
    // Util
    ////

    private notifyAll = () => {
        for (let l of this.listeners) {
            l(this.state);
        }
    }

    private setState = (state: Partial<MatchmakingState>) => {
        this.state = { ...this.state, ...state };
        this.notifyAll();
    }
}
