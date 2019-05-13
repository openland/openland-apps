import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { isServerMessage } from 'openland-engines/messenger/types';
import { UserShort } from 'openland-api/Types';
import { QuoteStateT } from './useQuote';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { InputMethodsStateT } from './useInputMethods';

type useKeydownHandlerT = {
    inputMethodsState: InputMethodsStateT;
    inputValue: string;
    quoteState: QuoteStateT;
    conversation?: ConversationEngine;
    user: UserShort | null;
    isActive: boolean | null;
};

export function useKeydownHandler({
    inputValue,
    inputMethodsState,
    quoteState,
    conversation,
    user,
    isActive,
}: useKeydownHandlerT) {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const keydownHandler = (e: any) => {
       
        if (messagesContext.forwardMessagesId && messagesContext.forwardMessagesId.size > 0) {
            return;
        }

        if (
            isActive &&
            inputValue.length === 0 &&
            conversation &&
            ((e.code === 'ArrowUp' && !e.altKey && inputMethodsState.getHasFocus()) ||
                (e.code === 'KeyE' && e.ctrlKey)) &&
            !quoteState.quoteMessagesId.length
        ) { 
            e.preventDefault();

            const size = conversation.dataSource.getSize();
            
            for (let i = 0; i < size; i++) {
                const item = conversation.dataSource.getAt(i);
                if (item.type === 'message' && item.isSending === false &&  user && item.senderId === user.id && item.id && item.text) {
                    messagesContext.setEditMessage(item.id, item.text);
                    return;
                }
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
