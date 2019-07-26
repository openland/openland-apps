import * as React from 'react';
import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActionsState {
    action?: 'forward' | 'reply' | 'edit';
    messages: DataSourceMessageItem[];
}

let toForward: DataSourceMessageItem[] | undefined;

export class MessagesActionsStateEngine {
    private state: MessagesActionsState = { messages: [] };
    private listeners = new Set<(state: MessagesActionsState) => void>();

    ////
    // Actions
    ////

    forwardInit = () => {
        toForward = this.state.messages;
        this.clear();
    }

    forwardFrom = (messages: DataSourceMessageItem[], from?: MessagesActionsStateEngine) => {
        if (from && (this !== from)) {
            from.clear();
        }
        this.setState({ messages, action: 'forward' });
    }

    forwardFromDonor = () => {
        if (toForward) {
            this.forwardFrom(toForward);
            toForward = undefined;
        }
    }

    reply = (message?: DataSourceMessageItem) => {
        this.setState({ messages: message ? [message] : this.state.messages, action: 'reply' });
    }

    edit = (message: DataSourceMessageItem) => {
        this.setState({ messages: [message], action: 'edit' });
    }

    selectToggle = (message: DataSourceMessageItem) => {
        if (this.state.action) {
            return;
        }
        if (!(this.state.messages || []).find(m => (m.id === message.id) || (m.key === message.key))) {
            this.setState({ messages: [...this.state.messages, message] });
        } else {
            this.setState({ messages: this.state.messages.filter(m => m.id !== message.id) });
        }
    }

    clear = () => {
        this.state = { messages: [] };
        this.notifyAll();
    }

    ////
    // IO
    ////

    listen = (listener: (state: MessagesActionsState) => void) => {
        this.listeners.add(listener);
        listener(this.state);
        return () => {
            this.listeners.delete(listener);
        };
    }

    listenSelect = (message: DataSourceMessageItem, listener: (selected: boolean) => void) => {
        return this.listen((s) => {
            listener(!!s.messages.find(m => (m.id && (m.id === message.id)) || (m.key === message.key)) && !s.action);
        });
    }

    getState = () => {
        return this.state;
    }

    useState = () => {
        let [state, setState] = React.useState(this.state);
        React.useEffect(() => {
            return this.listen((s) => {
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

    private setState = (state: Partial<MessagesActionsState>) => {
        this.state = { ...this.state, ...state };
        this.notifyAll();
    }
}

export const useMessageSelected = (engine: MessagesActionsStateEngine, message: DataSourceMessageItem): [boolean, () => void] => {
    let [selected, setSelected] = React.useState(false);
    React.useEffect(() => {
        return engine.listen((s) => {
            setSelected(!!s.messages.find(m => (m.id && (m.id === message.id)) || (m.key === message.key)) && !s.action);
        });
    }, [message]);
    let toggleSelect = React.useCallback(() => {
        engine.selectToggle(message);
    }, [message]);
    return [selected, toggleSelect];
};

export const useChatSelectionMode = (engine: MessagesActionsStateEngine) => {
    let [selectionActive, setSelectionActive] = React.useState(false);
    React.useEffect(() => {
        return engine.listen((s) => {
            setSelectionActive(s.messages.length > 0 && !s.action);
        });
    });
    return selectionActive;
};