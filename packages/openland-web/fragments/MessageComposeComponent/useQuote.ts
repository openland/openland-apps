import * as React from 'react';

import {
    MessagesStateContext,
    MessagesStateContextProps,
    getQuoteMessageReply,
    getQuoteMessagesId,
    getQuoteMessageSender,
} from '../../components/messenger/MessagesStateContext';

import { InputMethodsStateT } from './useInputMethods';

export type QuoteStateT = {
    setQuoteMessageReply?: Function;
    setQuoteMessageSender?: Function;
    setQuoteMessagesId?: Function;
    quoteMessageReply: string | null;
    quoteMessageSender: string | null;
    quoteMessagesId: string[];
    updateQuote: Function;
};

export function useQuote({
    conversationId,
    inputMethodsState,
}: {
    conversationId?: string;
    inputMethodsState: InputMethodsStateT;
}) {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const [quoteMessagesId, setQuoteMessagesId] = React.useState<string[]>([]);
    const [quoteMessageReply, setQuoteMessageReply] = React.useState<string | null>(null);
    const [quoteMessageSender, setQuoteMessageSender] = React.useState<string | null>(null);

    const updateQuote = () => {
        setQuoteMessageReply(getQuoteMessageReply(messagesContext));
        setQuoteMessagesId(getQuoteMessagesId(messagesContext));
        setQuoteMessageSender(getQuoteMessageSender(messagesContext));
    };

    React.useEffect(
        () => {
            updateQuote();
            if (!messagesContext.editMessage) {
                inputMethodsState.focusIfNeeded();
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
        setQuoteMessageReply,
        setQuoteMessageSender,
        setQuoteMessagesId,
        updateQuote,
    };
}
