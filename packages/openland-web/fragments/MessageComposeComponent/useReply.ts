import { MutationFunc } from 'react-apollo';
import {
    ReplyMessageVariables,
    ReplyMessage,
    RoomMembers_members,
    FullMessage,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { QuoteStateT } from './useQuote';
import { MentionsStateT } from './useMentions';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';

export type useReplyPropsT = {
    replyMessage?: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    conversationId?: string;
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
    mentionsState?: MentionsStateT;
    quoteState?: QuoteStateT;
    inputValue: string;
};

export function useReply({
    quoteState,
    inputValue,
    mentionsState,
    replyMessage,
    members,
    getMessages,
    conversationId,
}: useReplyPropsT) {
    const supportReply = () => {
        return !!replyMessage;
    };

    const supportMentions = () => {
        return !!mentionsState && !!members;
    };

    const finalQuoteMessagesId = quoteState ? quoteState.quoteMessagesId || [] : [];
    if (!supportReply()) {
        return {
            replyMessagesProc: () => {
                console.log('reply is not supported');
            },
        };
    }

    const replyMessagesProc = () => {
        if (finalQuoteMessagesId.length > 0) {
            let mentions: MentionDataT[] = [];
            // TODO simplify here
            if (supportMentions() && mentionsState!!.getMentions) {
                mentions = mentionsState!!.getMentions();
            }

            const currentMessages = getMessages ? getMessages() : [];

            const messagesToReply = currentMessages.filter(
                (item: FullMessage) => finalQuoteMessagesId.indexOf(item.id) !== -1,
            );

            replyMessage!!({
                variables: {
                    roomId: conversationId,
                    message: inputValue,
                    mentions: mentions.map(m => m.id),
                    replyMessages: finalQuoteMessagesId,
                },
            });
        }
    };

    return {
        replyMessagesProc,
    };
}
