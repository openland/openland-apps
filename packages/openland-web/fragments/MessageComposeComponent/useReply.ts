import { ReplyMessageVariables, ReplyMessage, MentionsMembers_members } from 'openland-api/Types';
import { QuoteStateT } from './useQuote';
import { MentionsStateT } from './useMentions';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';

export type useReplyPropsT = {
    replyMessage?: (variables: ReplyMessageVariables) => Promise<ReplyMessage>;
    conversationId?: string;
    members?: MentionsMembers_members[];
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

    const replyMessagesProc = async () => {
        if (finalQuoteMessagesId.length > 0) {
            let mentions: MentionDataT[] = [];
            // TODO simplify here
            if (supportMentions() && mentionsState!!.getMentions) {
                mentions = mentionsState!!.getMentions();
            }

            await replyMessage!!({
                roomId: conversationId!!,
                message: inputValue,
                mentions: mentions.map(m => m.id),
                replyMessages: finalQuoteMessagesId,
            });
        }
    };

    return {
        replyMessagesProc,
    };
}
