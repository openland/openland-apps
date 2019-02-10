import { MutationFunc } from 'react-apollo';
import { ReplyMessageVariables, ReplyMessage, RoomMembers_members } from 'openland-api/Types';
import { MessageFull } from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { QuoteStateT } from './useQuote';
import { MentionsStateT } from './useMentions';

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
    if (supportReply()) {
        return {
            replyMessagesProc: () => {
                console.log('reply is not supported');
            },
        };
    }

    const replyMessagesProc = () => {
        if (finalQuoteMessagesId.length > 0) {
            let mentions = null;
            // TODO simplify here
            if (supportMentions() && mentionsState!!.getMentions) {
                mentions = mentionsState!!.getMentions(
                    inputValue,
                    mentionsState!!.listOfMembersNames!!,
                    members,
                );
            }

            const currentMessages = getMessages ? getMessages() : [];

            const messagesToReply = currentMessages.filter(
                (item: MessageFull) => finalQuoteMessagesId.indexOf(item.id) !== -1,
            );

            const replyMentions = messagesToReply.reduce(
                (accumulator: string[], currentValue: ModelMessage) => {
                    if (!currentValue.mentions) {
                        return accumulator;
                    }

                    currentValue.mentions.forEach(mention => {
                        if (accumulator.indexOf(mention.id) === -1) {
                            accumulator.push(mention.id);
                        }
                    });

                    return accumulator;
                },
                mentions ? mentions.map(({ id }: any) => id) : [],
            );

            replyMessage!!({
                variables: {
                    roomId: conversationId,
                    message: inputValue,
                    mentions: replyMentions,
                    replyMessages: finalQuoteMessagesId,
                },
            });
        }
    };

    return {
        replyMessagesProc,
    };
}
