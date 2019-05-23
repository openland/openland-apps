import {
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention_user,
    FullMessage_ServiceMessage_spans,
    MentionInput,
} from 'openland-api/Types';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';

export const prepareLegacyMentions = (
    message: string,
    intermediateMentions: MentionToSend[],
): (
    | FullMessage_GeneralMessage_spans_MessageSpanUserMention
    | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[] => {
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
    mentions: (
        | FullMessage_GeneralMessage_spans_MessageSpanUserMention
        | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[],
): MentionInput[] => {
    let preparedMentions: MentionInput[] = [];

    mentions.map(m => {
        if (m.__typename === 'MessageSpanUserMention') {
            preparedMentions.push({
                offset: m.offset,
                length: m.length,
                userId: m.user.id,
            });
        } else if (m.__typename === 'MessageSpanAllMention') {
            preparedMentions.push({
                offset: m.offset,
                length: m.length,
                all: true,
            });
        }
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

export type UserWithOffset =
    | {
          typename: 'UserWithOffset';
          user: FullMessage_GeneralMessage_spans_MessageSpanUserMention_user;
          offset: number;
          length: number;
      }
    | {
          typename: 'AllMention';
          offset: number;
          length: number;
      };

export const convertToMentionInputNoText = (mention: UserWithOffset): MentionInput => {
    if (mention.typename === 'UserWithOffset') {
        return {
            userId: mention.user.id,
            offset: mention.offset,
            length: mention.length,
        };
    } else {
        return {
            all: true,
            offset: mention.offset,
            length: mention.length,
        };
    }
};

export const convertToMentionInputNoText2 = (
    mention:
        | FullMessage_GeneralMessage_spans_MessageSpanUserMention
        | FullMessage_GeneralMessage_spans_MessageSpanAllMention,
): MentionInput => {
    if (mention.__typename === 'MessageSpanUserMention') {
        return {
            userId: mention.user.id,
            offset: mention.offset,
            length: mention.length,
        };
    } else {
        return {
            all: true,
            offset: mention.offset,
            length: mention.length,
        };
    }
};

export const convertToMentionInput2 = ({
    mentions,
    text,
}: {
    mentions: (
        | FullMessage_GeneralMessage_spans_MessageSpanUserMention
        | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[];
    text: string;
}) => {
    let mentionsCleared: MentionInput[] = [];

    if (mentions.length > 0) {
        mentions.map(mention => {
            if (mention.__typename === 'MessageSpanUserMention') {
                if (text.indexOf(mention.user.name) >= 0) {
                    mentionsCleared.push(convertToMentionInputNoText2(mention));
                }
            } else if (mention.__typename === 'MessageSpanAllMention') {
                mentionsCleared.push(convertToMentionInputNoText2(mention));
            }
        });
    }

    return mentionsCleared.length > 0 ? mentionsCleared : null;
};

export const convertSpansToUserWithOffset = ({
    spans,
}: {
    spans: FullMessage_ServiceMessage_spans[];
}): UserWithOffset[] => {
    return spans
        .filter(span => {
            return span.__typename === 'MessageSpanUserMention';
        })
        .map((span: FullMessage_GeneralMessage_spans_MessageSpanUserMention) => {
            return {
                typename: 'UserWithOffset' as 'UserWithOffset',
                user: span.user,
                offset: span.offset,
                length: span.length,
            };
        });
};
