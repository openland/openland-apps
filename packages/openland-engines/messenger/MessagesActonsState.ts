import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActonsState {
    pendingAction?: 'reply' | 'forward' | 'delete';
    conversationId?: string;
    messages?: DataSourceMessageItem[];
}
export class MessagesActonsStateEngine {

    private state: MessagesActonsState = {};
    private listeners = new Set<(state: MessagesActonsState) => void>();

    setState = (state: Partial<MessagesActonsState>) => {
        this.state = { ...this.state, ...state };
        this.notifyAll();
    }

    listen = (listener: (state: MessagesActonsState) => void) => {
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