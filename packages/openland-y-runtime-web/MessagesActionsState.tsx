import * as React from 'react';
import { makeUseMessagesActionsForward, Context, State, Action, reducer, makeUseChatMessagesActions } from 'openland-y-utils/MessagesActionsState';

const MessagesActionsStateContext = React.createContext<Context>({ state: {}, dispatch: () => {/**/ } });

export const MessagesActionsStateProvider = React.memo((props: { children: any }) => {
    const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, {});

    return (
        <MessagesActionsStateContext.Provider value={{ state, dispatch }}>
            {props.children}
        </MessagesActionsStateContext.Provider>
    );
});

export const useMessagesActionsState = () => {
    return React.useContext(MessagesActionsStateContext);
};

export const useMessagesActionsForward = makeUseMessagesActionsForward(
    () => React.useContext(MessagesActionsStateContext),
);

export const useChatMessagesActions = makeUseChatMessagesActions(
    () => React.useContext(MessagesActionsStateContext)
);
