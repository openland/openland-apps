import { MessageFull } from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { ReplyMessageVariables, ReplyMessage, RoomMembers_members } from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import { getMentions } from './MessageComposeComponentDesktop';

export function useReply({
    conversationId,
    quoteMessagesId,
    replyMessage,
    getMessages,
    listOfMembersNames,
    members,
    inputValue,
}: {
    quoteMessagesId: string[];
    conversationId?: string;
    replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
    listOfMembersNames: string[];
    inputValue: string;
}) {
    const replyMessagesProc = () => {
        if (quoteMessagesId.length > 0) {
            let mentions = getMentions(inputValue, listOfMembersNames, members);
            const currentMessages = getMessages ? getMessages() : [];

            const messagesToReply = currentMessages.filter(
                (item: MessageFull) => quoteMessagesId.indexOf(item.id) !== -1,
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
                mentions ? mentions.map(({ id }) => id) : [],
            );

            replyMessage({
                variables: {
                    roomId: conversationId,
                    message: inputValue,
                    mentions: replyMentions,
                    replyMessages: quoteMessagesId,
                },
            });
        }
    };

    return {
        replyMessagesProc,
    };
}
