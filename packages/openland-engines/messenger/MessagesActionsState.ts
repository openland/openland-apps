import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActionsState {
    action?: 'forward' | 'reply' | 'edit';
    messages?: DataSourceMessageItem[];
    conversationId?: string;
}

let cachedMessagesActionState: MessagesActionsStateEngine | null;

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

    clearIfNeeded = (conversationId: string) => {
        if (conversationId === this.state.conversationId) {
            this.state = {};
            this.notifyAll();
        }
    }

    getState = () => {
        return this.state;
    }

    getGlobal = () => {
        if (!cachedMessagesActionState) {
            cachedMessagesActionState = new MessagesActionsStateEngine();
        }

        return cachedMessagesActionState!!;
    }

    private notifyAll = () => {
        for (let l of this.listeners) {
            l(this.state);
        }
    }
}