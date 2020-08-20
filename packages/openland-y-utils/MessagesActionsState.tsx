
import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { WatchSubscription } from './Watcher';

export type Action = { type: 'forward', messages?: DataSourceMessageItem[], sourceId?: string, conversationId: string, userId?: string }
    | { type: 'reply', message?: DataSourceMessageItem, conversationId: string, userId?: string }
    | { type: 'edit', message: DataSourceMessageItem, conversationId: string, userId?: string }
    | { type: 'toggle_select', message: DataSourceMessageItem, conversationId: string, userId?: string }
    | { type: 'clear', conversationId: string, userId?: string }
    | { type: 'clear_all' }
    | { type: 'update_messages', messages: DataSourceMessageItem[], conversationId: string, userId?: string };

export type MessagesAction = 'forward' | 'reply' | 'edit' | 'selected' | 'none';

export type ConversationActionsState = {
    messages: DataSourceMessageItem[],
    action: MessagesAction
};

export type State = {
    [conversationId: string]: ConversationActionsState
};

const omit = (keys: string[], obj: Object) => {
    const res = {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (!keys.includes(i)) {
                res[i] = obj[i];
            }
        }
    }
    return res;
};

export const reducer = (state: State, action: Action) => {
    if (action.type === 'forward') {
        if (action.sourceId) {
            let value = {
                action: 'forward',
                messages: state[action.sourceId].messages
            };
            return {
                ...omit([action.sourceId], state),
                [action.conversationId]: value,
                ...action.userId && { [action.userId]: value },
            };
        } if (action.messages) {
            let value = {
                action: 'forward',
                messages: action.messages
            };
            return {
                ...state,
                [action.conversationId]: value,
                ...action.userId && { [action.userId]: value },
            };
        }
    }
    if (action.type === 'edit') {
        let value = {
            action: 'edit',
            messages: [action.message],
        };
        return {
            ...state,
            [action.conversationId]: value,
            ...action.userId && { [action.userId]: value },
        };
    }
    if (action.type === 'reply') {
        if (action.message) {
            let value = {
                action: 'reply',
                messages: [action.message],
            };
            return {
                ...state,
                [action.conversationId]: value,
                ...action.userId && { [action.userId]: value },
            };
        } else {
            let value = {
                action: 'reply',
                messages: state[action.conversationId].messages,
            };
            return {
                ...state,
                [action.conversationId]: value,
                ...action.userId && { [action.userId]: value },
            };
        }
    }
    if (action.type === 'toggle_select') {
        const { message, conversationId } = action;
        let messages: DataSourceMessageItem[] = [];
        let prevMessages = state[conversationId]?.messages;
        if (prevMessages) {
            if (prevMessages.some(m => m.key === message.key)) {
                messages = prevMessages.filter(m => m.key !== message.key);
            } else {
                messages = prevMessages.concat(message);
            }
        } else {
            messages = [message];
        }

        if (messages.length > 0) {
            let value = {
                action: 'selected',
                messages: messages,
            };
            return {
                ...state,
                [conversationId]: value,
                ...action.userId && { [action.userId]: value },
            };
        } else {
            return omit([conversationId, action.userId!], state);
        }
    }
    if (action.type === 'clear') {
        return omit([action.conversationId, action.userId!], state);
    }
    if (action.type === 'clear_all') {
        return {};
    }
    if (action.type === 'update_messages') {
        let value = {
            action: state[action.conversationId].action,
            messages: action.messages,
        };
        return {
            ...state,
            [action.conversationId]: value,
            ...action.userId && { [action.userId]: value },
        };
    }
    return state;
};

export type Context = { state: State, dispatch: (action: Action) => void };

export type ChatMessagesActionsMethods = {
    getState: () => ConversationActionsState,
    clear: () => void,
    clearAll: () => void,
    reply: (message?: DataSourceMessageItem) => void,
    edit: (message: DataSourceMessageItem) => void,
    toggleSelect: (message: DataSourceMessageItem) => void,
    prepareToSend: () => DataSourceMessageItem[],
};

export type ChatMessagesActions = {
    getState: () => ConversationActionsState,
    clear: () => void,
    clearAll: () => void,
    reply: (message?: DataSourceMessageItem) => void,
    edit: (message: DataSourceMessageItem) => void,
    toggleSelect: (message: DataSourceMessageItem) => void,
    prepareToSend: () => DataSourceMessageItem[],
};

type MessagesActionsStateHandler = (ops: { state: ConversationActionsState, dispatch: Context['dispatch'] }) => void;

class MessagesActionsState {
    private engine: MessengerEngine | undefined;
    private dataSourceWatchMap = new Map<string, WatchSubscription>();
    private listeners: { conversationId: string, userId?: string, handler: MessagesActionsStateHandler }[] = [];
    private context: Context = { state: {}, dispatch: () => {/**/ } };

    listen = ({ conversationId, userId, handler }: { conversationId: string, userId?: string, handler: MessagesActionsStateHandler }) => {
        handler({ state: this.getItemState({ conversationId, userId }) || { action: 'none', messages: [] }, dispatch: this.context.dispatch });
        this.listeners.push({ conversationId, userId, handler });
        this.subscribeToDataSource(conversationId);
        if (userId) {
            this.subscribeToDataSource(userId);
        }
        return () => {
            let index = this.listeners.findIndex(x => x.handler === handler);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
            let shouldUnsubConvDs = this.listeners.filter(x => x.conversationId === conversationId).length === 1;
            let shouldUnsubUserDs = this.listeners.filter(x => x.userId && userId && x.userId === userId).length === 1;
            if (shouldUnsubConvDs) {
                let unsub = this.dataSourceWatchMap.get(conversationId);
                if (unsub) {
                    unsub();
                    this.dataSourceWatchMap.delete(conversationId);
                }
            }
            if (shouldUnsubUserDs) {
                let unsub = this.dataSourceWatchMap.get(userId!);
                if (unsub) {
                    unsub();
                    this.dataSourceWatchMap.delete(userId!);
                }
            }
        };
    }

    subscribeToDataSource = (chatId: string) => {
        if (this.dataSourceWatchMap.has(chatId)) {
            return;
        }
        let conv = this.engine?.getActiveConversation(chatId);
        let ds = conv?.dataSource;
        if (!ds) {
            return;
        }
        let fnStub = () => {/**/ };
        this.dataSourceWatchMap.set(chatId, ds.watch({
            onDataSourceInited: fnStub,
            onDataSourceScrollToKeyRequested: fnStub,
            onDataSourceScrollToTop: fnStub,
            onDataSourceItemAdded: fnStub,
            onDataSourceItemUpdated: fnStub,
            onDataSourceItemRemoved: (item) => {
                let state = this.getState();
                let itemStateEntry = Object.entries(state).find(([key, value]) => value.messages.some(message => message.key === item.key));
                if (itemStateEntry) {
                    const [id, itemState] = itemStateEntry;
                    let messages = itemState.messages.filter(x => item.key !== x.key);
                    if (messages.length > 0) {
                        this.dispatch({ type: 'update_messages', conversationId: id, messages });
                    } else {
                        this.dispatch({ type: 'clear', conversationId: id });
                    }
                }
            },
            onDataSourceItemMoved: fnStub,
            onDataSourceLoadedMore: fnStub,
            onDataSourceLoadedMoreForward: fnStub,
            onDataSourceCompleted: fnStub,
            onDataSourceCompletedForward: fnStub,
        }));
    }

    getItemState = ({ conversationId, userId }: { conversationId?: string, userId?: string }): ConversationActionsState => {
        let userState = userId && this.getState()[userId];
        let convState = conversationId && this.getState()[conversationId];
        return userState || convState || { action: 'none', messages: [] };
    }

    getState = () => {
        return this.context.state;
    }

    dispatch: Context['dispatch'] = (action) => {
        this.context.dispatch(action);
    }

    useProvider = (engine: MessengerEngine) => {
        const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, {});

        this.context = { state, dispatch };
        this.engine = engine;

        React.useEffect(() => {
            this.listeners.forEach(({ conversationId, userId, handler }) => {
                handler({ state: this.getItemState({ conversationId, userId }), dispatch: this.context.dispatch });
            });
        }, [state]);
    }
}

export const MessagesActionsStateController = new MessagesActionsState();

type ChatIds = { conversationId: string | undefined, userId: string | undefined };

export const useChatMessagesActionsMethods = ({ conversationId, userId }: ChatIds) => {
    const _getState = () => MessagesActionsStateController.getItemState({ userId, conversationId });
    const clear = () => {
        if (conversationId) {
            MessagesActionsStateController.dispatch({ type: 'clear', conversationId, userId });
        }
    };
    const clearAll = () => {
        MessagesActionsStateController.dispatch({ type: 'clear_all' });
    };
    const edit = (message: DataSourceMessageItem) => {
        if (conversationId) {
            MessagesActionsStateController.dispatch({ type: 'edit', message, conversationId });
        }
    };
    const toggleSelect = (message: DataSourceMessageItem) => {
        if (conversationId) {
            MessagesActionsStateController.dispatch({ type: 'toggle_select', message, conversationId, userId });
        }
    };
    const reply = (message?: DataSourceMessageItem) => {
        if (conversationId) {
            MessagesActionsStateController.dispatch({ type: 'reply', message, conversationId, userId });
        }
    };
    const prepareToSend = () => {
        let action = _getState().action;
        let hasMessages = action === 'reply' || action === 'forward';
        let messages = hasMessages ? _getState().messages : [];
        if (hasMessages) {
            clearAll();
        }
        return messages;
    };

    return { clear, clearAll, edit, toggleSelect, reply, prepareToSend, getState: _getState };
};

export const useChatMessagesActionsState = ({ conversationId, userId }: ChatIds) => {
    const [state, setState] = React.useState<ConversationActionsState>({ action: 'none', messages: [] });
    React.useEffect(() => {
        if (!conversationId) {
            return;
        }
        return MessagesActionsStateController.listen({
            conversationId,
            userId,
            handler: x => setState(x.state)
        });

    }, [userId, conversationId]);
    return state;
};

export const useChatMessagesSelected = ({ conversationId, userId, messageKey }: ChatIds & { messageKey: string }): [boolean, (message: DataSourceMessageItem) => void] => {
    const [selected, setSelected] = React.useState(false);
    const toggleSelect = (message: DataSourceMessageItem) => {
        if (conversationId) {
            MessagesActionsStateController.dispatch({ type: 'toggle_select', message, conversationId, userId });
        }
    };
    React.useEffect(() => {
        const handler = ({ state }: { state: ConversationActionsState }) => {
            if (state.action === 'selected' && state.messages.some(x => x.key === messageKey)) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        };
        if (!conversationId) {
            return;
        }
        return MessagesActionsStateController.listen({ userId, conversationId, handler });
    }, [userId, conversationId]);

    return [selected, toggleSelect];
};

export const useChatMessagesSelectionMode = ({ conversationId, userId }: { conversationId: string | undefined, userId: string | undefined }) => {
    const [selected, setSelected] = React.useState(false);
    React.useEffect(() => {
        const handler = ({ state }: { state: ConversationActionsState }) => {
            if (state.action === 'selected') {
                setSelected(true);
            } else {
                setSelected(false);
            }
        };
        if (!conversationId) {
            return;
        }
        return MessagesActionsStateController.listen({ userId, conversationId, handler });
    }, [userId, conversationId]);

    return selected;
};

export const useMessagesActionsForward = ({ sourceId }: { sourceId: string }) => {
    const prepareForward = ({ targetId, messages }: { targetId: string, messages?: DataSourceMessageItem[] }) => {
        const payload = messages ? { messages, conversationId: targetId } : { sourceId, conversationId: targetId };
        const newState = reducer(MessagesActionsStateController.getState(), { type: 'forward', ...payload });
        MessagesActionsStateController.dispatch({ type: 'clear_all' });
        return newState[targetId].messages || [];
    };
    const forward = ({ targetId, messages }: { targetId: string, messages?: DataSourceMessageItem[] }) => {
        const payload = messages ? { messages, conversationId: targetId } : { sourceId, conversationId: targetId };
        MessagesActionsStateController.dispatch({ type: 'forward', ...payload });
    };
    return { forward, prepareForward };
};
