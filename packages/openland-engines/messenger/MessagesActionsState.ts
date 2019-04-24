import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActionsState {
    action?: 'forward' | 'reply' | 'edit';
    messages?: DataSourceMessageItem[];
}

export class MessagesActionsStateEngine {
    private state: MessagesActionsState = {};
    private listeners = new Set<(state: MessagesActionsState) => void>();

    setState = (state: Partial<MessagesActionsState>) => {
        this.state = { ...this.state, ...state };
        this.notifyAll();
    }

    listen = (listener: (state: MessagesActionsState) => void) => {
        this.listeners.add(listener);
        listener(this.state);
        return () => {
            this.listeners.delete(listener);
        }
    }

    clear = () => {
        this.state = {};
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