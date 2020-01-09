import * as React from 'react';
import { DataSourceMessageItem, ConversationEngine } from "./ConversationEngine";
import { DataSource } from 'openland-y-utils/DataSource';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

export interface MessagesActionsState {
    action?: 'forward' | 'reply' | 'edit';
    messages: DataSourceMessageItem[];
}

export class MessagesActionsStateEngine {
    private state: MessagesActionsState = { messages: [] };
    private listeners = new Set<(state: MessagesActionsState) => void>();
    private engine: MessengerEngine;

    constructor (engine: MessengerEngine) {
        this.engine = engine;
    }

    ////
    // Actions
    ////

    forward = (messages: DataSourceMessageItem[], from?: MessagesActionsStateEngine) => {
        if (from && (this !== from)) {
            from.clear();
        }
        this.setState({ messages, action: 'forward' });
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
        if (!(this.state.messages || []).find(m => (m.key === message.key))) {
            this.setState({ messages: [...this.state.messages, message] });
        } else {
            this.setState({ messages: this.state.messages.filter(m => m.key !== message.key) });
        }
    }

    sync = (ds: DataSource<{ key: string }>) => {
        this.setState({ messages: this.state.messages.filter(m => !!ds.getItem(m.key)) });
    }

    clear = () => {
        let changed = this.state.action || this.state.messages.length;
        this.state = { messages: [] };
        this.notifyAll();
        return !!changed;
    }

    clearAll = () => {
        this.engine.activeConversations.forEach((conversation: ConversationEngine) => {
            conversation.messagesActionsStateEngine.clear();
        });
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
            listener(!!s.messages.find(m => (m.key === message.key)) && !s.action);
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
            setSelected(!!s.messages.find(m => (m.key === message.key)) && !s.action);
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