import {
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    UserShort,
} from 'openland-api/Types';

export const prepareLegacyMentions = (message: string, intermediateMentions: UserShort[]) => {
    if (message.length === 0) {
        return [];
    }

    let spans: FullMessage_GeneralMessage_spans_MessageSpanUserMention[] = [];

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
        let mentionText = '@' + mention.name;

        let index = getOffset(mentionText);

        if (index > -1) {
            spans.push({
                __typename: 'MessageSpanUserMention',
                offset: index,
                length: mentionText.length,
                user: {
                    __typename: 'User',
                    name: mention.name,
                    id: mention.id,
                    isYou: true,
                    firstName: mention.firstName,
                    lastName: mention.lastName,
                    shortname: mention.shortname,
                    photo: mention.photo,
                },
            });
        }
    }

    return spans;
};
