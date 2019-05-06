import {
    MentionInput,
    FullMessage_ServiceMessage_spans,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention_user,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
} from 'openland-api/Types';

export type UserWithOffset = {
    user: FullMessage_GeneralMessage_spans_MessageSpanUserMention_user;
    offset: number;
    length: number;
};

export const convertToMentionInput = ({
    mentions,
    text,
}: {
    mentions: UserWithOffset[];
    text: string;
}) => {
    let mentionsCleared: MentionInput[] = [];

    if (mentions.length > 0) {
        mentions.map(mention => {
            if (text.indexOf(mention.user.name) >= 0) {
                mentionsCleared.push({
                    userId: mention.user.id,
                    offset: mention.offset,
                    length: mention.length,
                });
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
                user: span.user,
                offset: span.offset,
                length: span.length,
            };
        });
};
