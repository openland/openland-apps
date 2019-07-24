import * as React from 'react';
import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActionsState {
    action?: 'forwardInit' | 'forward' | 'reply' | 'edit';
    messages: DataSourceMessageItem[];
}

let forwardDonor: MessagesActionsStateEngine | undefined;

export class MessagesActionsStateEngine {
    private state: MessagesActionsState = { messages: [] };
    private listeners = new Set<(state: MessagesActionsState) => void>();

    private setState = (state: Partial<MessagesActionsState>) => {
        this.state = { ...this.state, ...state };
        this.notifyAll();
    }

    forwardFromDonor = () => {
        if (forwardDonor) {
            this.forwardFrom(forwardDonor.getState().messages, forwardDonor);
        }
    }

    forwardFrom = (messages: DataSourceMessageItem[], from: MessagesActionsStateEngine) => {
        this.setState({ messages, action: 'forward' });
        if (this !== from) {
            from.clear();
        }
    }

    forwardInit = (message?: DataSourceMessageItem) => {
        this.setState({ action: 'forwardInit', ... (message ? { messages: [message] } : {}) });
        forwardDonor = this;
    }

    reply = (message: DataSourceMessageItem) => {
        this.setState({ messages: [message], action: 'reply' });
    }

    edit = (message: DataSourceMessageItem) => {
        this.setState({ messages: [message], action: 'edit' });
    }

    selectToggle = (message: DataSourceMessageItem) => {
        if (!(this.state.messages || []).find(m => (m.id === message.id) || (m.key === message.key))) {
            this.state.messages.push(message);
            this.notifyAll();
        } else {
            this.setState({ messages: this.state.messages.filter(m => m.id !== message.id) });
        }
    }

    listen = (listener: (state: MessagesActionsState) => void) => {
        this.listeners.add(listener);
        listener(this.state);
        return () => {
            this.listeners.delete(listener);
        };
    }

    clear = () => {
        this.state = { messages: [] };
        this.notifyAll();
    }

    getState = () => {
        return this.state;
    }

    private notifyAll = () => {
        for (let l of this.listeners) {
            l(this.state);
        }
    }
}

export const useMessageSelected = (engine: MessagesActionsStateEngine, self: DataSourceMessageItem): [boolean, () => void] => {
    let [selected, setSelected] = React.useState(false);
    React.useEffect(() => {
        return engine.listen((s) => {
            setSelected(!!s.messages.find(m => (m.id === self.id) || (m.key === self.key)));
        });
    }, [self]);
    let toggleSelect = React.useCallback(() => {
        engine.selectToggle(self);
    }, [self]);
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