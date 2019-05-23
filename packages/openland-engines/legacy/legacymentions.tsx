import {
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
    MentionInput,
} from 'openland-api/Types';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';

export const prepareLegacyMentions = (message: string, intermediateMentions: MentionToSend[]) => {
    if (message.length === 0) {
        return [];
    }

    let spans: (
        | FullMessage_GeneralMessage_spans_MessageSpanUserMention
        | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[] = [];

    let offsets = new Set<number>();

    function getOffset(str: string, n: number = 0): number {
        let offset = message.indexOf(str, n);

        if (offsets.has(offset)) {
            return getOffset(str, n + 1);
        }

        offsets.add(offset);
        return offset;
    }

    for (let mention of intermediateMentions) {
        let mentionText;
        if (mention.__typename === 'User') {
            mentionText = '@' + mention.name;
        } else {
            mentionText = '@All';
        }

        let index = getOffset(mentionText);

        if (index > -1) {
            if (mention.__typename === 'User') {
                spans.push({
                    __typename: 'MessageSpanUserMention',
                    offset: index,
                    length: mentionText.length,
                    user: {
                        __typename: 'User',
                        name: mention.name,
                        id: mention.id,
                        isYou: mention.isYou,
                        photo: mention.photo,
                        primaryOrganization: mention.primaryOrganization,
                    },
                });
            } else if (mention.__typename === 'AllMention') {
                spans.push({
                    __typename: 'MessageSpanAllMention',
                    offset: index,
                    length: mentionText.length,
                });
            }
        }
    }

    return spans;
};

export const prepareMentionsToSend = (
    mentions: FullMessage_GeneralMessage_spans_MessageSpanUserMention[],
): MentionInput[] => {
    let preparedMentions: MentionInput[] = [];

    mentions.map(m => {
        preparedMentions.push({
            offset: m.offset,
            length: m.length,
            userId: m.user.id,
        });
    });

    return preparedMentions;
};

export const prepareLegacyMentionsForSend = (
    message: string,
    intermediateMentions: MentionToSend[],
): MentionInput[] => {
    let preparedMentions: MentionInput[] = [];
    let legacyMentions = prepareLegacyMentions(message, intermediateMentions);

    legacyMentions.map(m => {
        if (m.__typename === 'MessageSpanUserMention') {
            preparedMentions.push({
                offset: m.offset,
                length: m.length,
                userId: m.user.id,
            });
        } else if (m.__typename === 'MessageSpanAllMention') {
            preparedMentions.push({
                all: true,
                offset: m.offset,
                length: m.length,
            });
        }
    });

    return preparedMentions;
};
