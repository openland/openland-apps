import {
    MentionInput,
    FullMessage_ServiceMessage_spans,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention_user,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';

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
