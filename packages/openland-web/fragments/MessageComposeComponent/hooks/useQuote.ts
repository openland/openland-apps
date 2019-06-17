import * as React from 'react';

import {
    MessagesStateContext,
    MessagesStateContextProps,
    getQuoteMessageReply,
    getQuoteMessagesId,
    getQuoteMessageSender,
} from 'openland-web/components/messenger/MessagesStateContext';

import { InputMethodsStateT } from './useInputMethods';

export type QuoteStateT = {
    quoteMessageReply: string | null;
    quoteMessageSender: string | null;
    quoteMessagesId: string[];
    updateQuote: Function;
    clearQuote: Function;
    getQuote: () => string | false | null;
};

type useQuoteT = {
    conversationId?: string;
    inputMethodsState: InputMethodsStateT;
};

export function useQuote({ conversationId, inputMethodsState }: useQuoteT): QuoteStateT {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const [quoteMessagesId, setQuoteMessagesId] = React.useState<string[]>([]);
    const [quoteMessageReply, setQuoteMessageReply] = React.useState<string | null>(null);
    const [quoteMessageSender, setQuoteMessageSender] = React.useState<string | null>(null);

    const updateQuote = () => {
        setQuoteMessageReply(getQuoteMessageReply(messagesContext));
        setQuoteMessagesId(getQuoteMessagesId(messagesContext));
        setQuoteMessageSender(getQuoteMessageSender(messagesContext));
    };

    const clearQuote = () => {
        setQuoteMessageReply!!(null);
        setQuoteMessageSender!!(null);
        setQuoteMessagesId!!([]);
    };

    const getQuote = () => {
        return quoteMessageReply && quoteMessagesId.length !== 0 && quoteMessageSender;
    };

    React.useEffect(
        () => {
            updateQuote();
            if (!messagesContext.editMessage) {
                inputMethodsState.focusIfEnabled();
            }
        },
        [messagesContext.replyMessages],
    );

    React.useEffect(
        () => {
            updateQuote();
        },
        [conversationId],
    );

    return {
        quoteMessagesId,
        quoteMessageReply,
        quoteMessageSender,
        clearQuote,
        getQuote,
        updateQuote,
    };
}
