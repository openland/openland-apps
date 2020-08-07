
import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

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
            ...state[action.conversationId],
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

export type ChatMessagesActions = {
    getState: () => ConversationActionsState,
    clear: () => void,
    clearAll: () => void,
    reply: (message?: DataSourceMessageItem) => void,
    edit: (message: DataSourceMessageItem) => void,
    toggleSelect: (message: DataSourceMessageItem) => void,
    prepareToSend: () => DataSourceMessageItem[],
};

export const makeUseChatMessagesActions = (usePlatformContext: () => Context) =>
    ({ conversationId, userId }: { conversationId: string | undefined, userId?: string | undefined }): ChatMessagesActions => {
        const { state, dispatch } = usePlatformContext();

        const stateRef = React.useRef(state);
        React.useEffect(() => {
            stateRef.current = state;
        }, [state]);

        const getState = () => {
            let userConversationState = userId && state[userId];
            let conversationState = conversationId && state[conversationId];
            return userConversationState || conversationState || ({ action: 'none', messages: [] });
        };

        const getStateRef = () => {
            let userConversationState = userId && stateRef.current[userId];
            let conversationState = conversationId && stateRef.current[conversationId];
            return userConversationState || conversationState || ({ action: 'none', messages: [] });
        };

        const clear = () => {
            if (conversationId) {
                dispatch({ type: 'clear', conversationId, userId });
            }
        };
        const clearAll = () => {
            dispatch({ type: 'clear_all' });
        };
        const edit = (message: DataSourceMessageItem) => {
            if (conversationId) {
                dispatch({ type: 'edit', message, conversationId });
            }
        };
        const toggleSelect = (message: DataSourceMessageItem) => {
            if (conversationId) {
                dispatch({ type: 'toggle_select', message, conversationId, userId });
            }
        };
        const reply = (message?: DataSourceMessageItem) => {
            if (conversationId) {
                dispatch({ type: 'reply', message, conversationId, userId });
            }
        };
        const prepareToSend = () => {
            let messages = getStateRef().messages;
            clearAll();
            return messages;
        };

        return {
            getState,
            clear,
            clearAll,
            reply,
            edit,
            toggleSelect,
            prepareToSend,
        };
    };

export const makeUseMessagesActionsForward = (usePlatformContext: () => Context) => ({ sourceId }: { sourceId: string }) => {
    const { state, dispatch } = usePlatformContext();
    const stateRef = React.useRef(state);
    React.useEffect(() => {
        stateRef.current = state;
    }, [state]);
    const prepareForward = ({ targetId, messages }: { targetId: string, messages?: DataSourceMessageItem[] }) => {
        const payload = messages ? { messages, conversationId: targetId } : { sourceId, conversationId: targetId };
        const newState = reducer(stateRef.current, { type: 'forward', ...payload });
        dispatch({ type: 'clear', conversationId: sourceId });
        return newState[targetId].messages || [];
    };
    const forward = ({ targetId, messages }: { targetId: string, messages?: DataSourceMessageItem[] }) => {
        const payload = messages ? { messages, conversationId: targetId } : { sourceId, conversationId: targetId };
        dispatch({ type: 'forward', ...payload });
    };
    return { forward, prepareForward };
};
