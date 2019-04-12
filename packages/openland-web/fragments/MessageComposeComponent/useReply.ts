import { ReplyMessageVariables, ReplyMessage, MentionsMembers_members } from 'openland-api/Types';
import { QuoteStateT } from './useQuote';
import { MentionsStateT } from './useMentions';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

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
            let mentions: UserWithOffset[] = [];
            // TODO simplify here
            if (supportMentions() && mentionsState!!.getMentions) {
                mentions = mentionsState!!.getMentions().map((user: any) => user);
            }

            await replyMessage!!({
                roomId: conversationId!!,
                message: inputValue,
                mentions: mentions.map(m => m.user.id),
                replyMessages: finalQuoteMessagesId,
            });
        }
    };

    return {
        replyMessagesProc,
    };
}
