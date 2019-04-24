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

    getState = () => {
        return this.state;
    }

    setBuffer = () => {
        this.getGlobal().clear();
        this.getGlobal().setState(this.state);
    }

    getBuffer = () => {
        this.clear();
        this.setState(this.getGlobal().getState());
        this.getGlobal().clear();
    }

    private getGlobal = () => {
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