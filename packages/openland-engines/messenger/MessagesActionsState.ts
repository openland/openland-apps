import { DataSourceMessageItem } from "./ConversationEngine";

export interface MessagesActionsState {
    action?: 'forward' | 'reply' | 'edit';
    messages?: DataSourceMessageItem[];
}

let bufferedMessages: DataSourceMessageItem[] = [];

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
        if (this.state.messages && this.state.messages.length > 0) {
            bufferedMessages = this.state.messages;
        }
    }

    getBuffer = () => {
        this.clear();

        this.setState({ messages: bufferedMessages });

        bufferedMessages = [];
    }

    private notifyAll = () => {
        for (let l of this.listeners) {
            l(this.state);
        }
    }
}