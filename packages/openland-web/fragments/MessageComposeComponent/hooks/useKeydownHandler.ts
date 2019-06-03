import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { UserShort } from 'openland-api/Types';
import { QuoteStateT } from './useQuote';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { InputMethodsStateT } from './useInputMethods';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';

type useKeydownHandlerT = {
    inputMethodsState: InputMethodsStateT;
    quoteState: QuoteStateT;
    conversation?: ConversationEngine;
    user: UserShort | null;
    inputValue: string;
};

export function useKeydownHandler({
    inputValue,
    inputMethodsState,
    quoteState,
    conversation,
    user,
}: useKeydownHandlerT) {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const isActive = React.useContext(IsActivePoliteContext);

    const setEditMessage = () => {
        if (!conversation) {
            return;
        }
        if (messagesContext.forwardMessagesId && messagesContext.forwardMessagesId.size > 0) {
            return;
        }
        if (!isActive.getValue() || !inputMethodsState.getHasFocus()) {
            return;
        }

        if (quoteState.quoteMessagesId.length) {
            return;
        }

        const size = conversation.dataSource.getSize();

        for (let i = 0; i < size; i++) {
            const item = conversation.dataSource.getAt(i);
            if (
                item.type === 'message' &&
                item.isSending === false &&
                user &&
                item.senderId === user.id &&
                item.id &&
                item.text &&
                !item.isService
            ) {
                messagesContext.setEditMessage(item.id, item.text);
                return;
            }
        }
    };

    const handleUp = () => {
        if (inputValue !== '') {
            return;
        }
        setEditMessage();
    };

    const handleCommandUp = () => {
        setEditMessage();
    };

    return {
        handleCommandUp,
        handleUp,
    };
}
