import * as React from 'react';

export interface MatchmakingState {
    answers: Map<string, string[] | string | null>;
}

type Answers = {questionId: string, text: string} | {questionId: string, tags: string[]};

export class MatchmakingEngine {
    private state: MatchmakingState = { answers: new Map() };
    private listeners = new Set<(state: MatchmakingState) => void>();

    ////
    // Actions
    ////

    addAnswer = (answer: Map<string, string[] | string | null>) => {
        this.setState({ answers: answer });
    }

    getAnswers = () => {
        let answers: Answers[] = [];
        this.state.answers.forEach((val, key) => {
            if (val) {
                if (typeof(val) === 'string') {
                    answers.push({questionId: key, text: val});
                } else {
                    answers.push({questionId: key, tags: val});
                }
            }
        });
        return answers;
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

    private setState = (state: MatchmakingState) => {
        const newState = new Map([...this.state.answers].concat([...state.answers]));
        this.state = { answers: newState };
        this.notifyAll();
    }
}
