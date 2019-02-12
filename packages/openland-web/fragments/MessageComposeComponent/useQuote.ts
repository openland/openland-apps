import * as React from 'react';

import {
    MessagesStateContext,
    MessagesStateContextProps,
    getQuoteMessageReply,
    getQuoteMessageId,
    getQuoteMessageSender,
} from '../../components/messenger/MessagesStateContext';

export type QuoteStateT = {
    setQuoteMessageReply?: Function;
    setQuoteMessageSender?: Function;
    setQuoteMessagesId?: Function;
    quoteMessageReply?: any;
    quoteMessageSender?: any;
    quoteMessagesId?: string[];
};

export function useQuote({ conversationId }: { conversationId?: string }) {
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const [quoteMessagesId, setQuoteMessagesId] = React.useState<string[]>([]);
    const [quoteMessageReply, setQuoteMessageReply] = React.useState<string | undefined>(undefined);
    const [quoteMessageSender, setQuoteMessageSender] = React.useState<string | undefined>(
        undefined,
    );

    const shouldHaveQuote = () => {
        const { replyMessagesId } = messagesContext;

        return !!replyMessagesId.size;
    };

    const updateQuote = () => {
        if (shouldHaveQuote()) {
            setQuoteMessageReply(getQuoteMessageReply(messagesContext));
            setQuoteMessagesId(getQuoteMessageId(messagesContext));
            setQuoteMessageSender(getQuoteMessageSender(messagesContext));
        }
    };

    React.useEffect(() => {
        updateQuote();
    }, [messagesContext.replyMessages]);

    React.useEffect(() => {
        updateQuote();
    }, [conversationId]);

    return {
        quoteMessagesId,
        setQuoteMessagesId,
        quoteMessageReply,
        setQuoteMessageReply,
        quoteMessageSender,
        setQuoteMessageSender,
    };
}
