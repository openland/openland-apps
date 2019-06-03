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
};

export function useKeydownHandler({
    inputMethodsState,
    quoteState,
    conversation,
    user,
}: useKeydownHandlerT) {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const isActive = React.useContext(IsActivePoliteContext);

    const handleCommandUp = () => {
        if (messagesContext.forwardMessagesId && messagesContext.forwardMessagesId.size > 0) {
            return;
        }

        if (!isActive.getValue() || !inputMethodsState.getHasFocus() || !conversation) {
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

    return {
        handleCommandUp,
    };
}
