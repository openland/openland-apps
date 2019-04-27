import * as React from 'react';
import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActionsState {
    action?: 'forward' | 'reply' | 'edit';
    messages: DataSourceMessageItem[];
}

export class MessagesActionsStateEngine {
    private state: MessagesActionsState = { messages: [] };
    private listeners = new Set<(state: MessagesActionsState) => void>();

    setState = (state: Partial<MessagesActionsState>) => {
        this.state = { ...this.state, ...state };
        this.notifyAll();
    }

    selectToggle = (message: DataSourceMessageItem) => {
        if (!(this.state.messages || []).includes(message)) {
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
        }
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

export const useMessageSelected = (engine: MessagesActionsStateEngine, self: DataSourceMessageItem) => {
    let [selected, setSelected] = React.useState(false);
    let [selectionActive, setSelectionActive] = React.useState(false);
    React.useEffect(() => {
        return engine.listen((s) => {
            setSelected(s.messages.includes(self));
            setSelectionActive(s.messages.length > 0 && !s.action);
        })
    }, [self])
    return [selected, selectionActive];
}