import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { isServerMessage } from 'openland-engines/messenger/types';
import { UserShort } from 'openland-api/Types';
import { QuoteStateT } from './useQuote';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';
import { InputMethodsStateT } from './useInputMethods';

export function useKeydownHandler({
    inputValue,
    inputMethodsState,
    quoteState,
    conversation,
    user,
}: {
    inputMethodsState: InputMethodsStateT;
    inputValue: string;
    quoteState: QuoteStateT;
    conversation?: ConversationEngine;
    user: UserShort | null;
}) {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const keydownHandler = (e: any) => {
        if (messagesContext.forwardMessagesId && messagesContext.forwardMessagesId.size > 0) {
            return;
        }

        if (
            inputValue.length === 0 &&
            conversation &&
            ((e.code === 'ArrowUp' && !e.altKey && inputMethodsState.hasFocus()) ||
                (e.code === 'KeyE' && e.ctrlKey)) &&
            !quoteState.quoteMessagesId
        ) {
            let messages = conversation
                .getState()
                .messages.filter(
                    (m: any) => isServerMessage(m) && m.message && user && m.sender.id === user.id,
                );
            let messageData = messages[messages.length - 1];
            if (messageData && isServerMessage(messageData)) {
                e.preventDefault();
                messagesContext.setEditMessage(messageData.id, messageData.message);
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', keydownHandler);

        return function cleanup() {
            window.removeEventListener('keydown', keydownHandler);
        };
    });
}
