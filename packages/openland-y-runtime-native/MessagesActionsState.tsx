import * as React from 'react';
import { reducer, makeUseChatMessagesActions, makeUseMessagesActionsForward, Context, State, Action } from 'openland-y-utils/MessagesActionsState';

type MessagesActionsStateHandler = (context: Context) => void;

class MessagesActionsState {
    private listeners: MessagesActionsStateHandler[] = [];
    private context: Context = { state: {}, dispatch: () => {/**/ } };

    listen = (handler: MessagesActionsStateHandler) => {
        handler(this.context);
        this.listeners.push(handler);
        return () => {
            let index = this.listeners.indexOf(handler);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    }

    useProvider = () => {
        const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, {});

        this.context = { state, dispatch };

        React.useEffect(() => {
            this.listeners.forEach(l => {
                l(this.context);
            });
        }, [state]);
    }
}

const MessagesActionsStateController = new MessagesActionsState();

export const MessagesActionsStateProvider = React.memo((props) => {
    MessagesActionsStateController.useProvider();

    return (
        <>
            {props.children}
        </>
    );
});

const useMessagesActionsState = () => {
    const [context, setContext] = React.useState<{ state: State, dispatch: (action: Action) => void }>({ state: {}, dispatch: () => {/**/ } });
    React.useEffect(() => {
        return MessagesActionsStateController.listen(setContext);
    }, []);

    return context;
};

export const useChatMessagesActions = makeUseChatMessagesActions(
    useMessagesActionsState
);

export const useMessagesActionsForward = makeUseMessagesActionsForward(
    useMessagesActionsState,
);