import {
    MentionInput,
    FullMessage_GeneralMessage_spans,
    ChatMentionSearch_mentions_items_MentionSearchSharedRoom_room,
} from 'openland-api/spacex.types';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';

type SpanMentionsT = FullMessage_GeneralMessage_spans[];

export const prepareLegacyMentions = (
    message: string,
    intermediateMentions: MentionToSend[],
): SpanMentionsT => {
    if (message.length === 0) {
        return [];
    }

    let spans: SpanMentionsT = [];

    let offsets = new Set<number>();

    function getOffset(str: string, n: number = 0): number {
        let offset = message.toLowerCase().indexOf(str.toLowerCase(), n);

        if (offset >= 0) {
            if (offsets.has(offset)) {
                return getOffset(str, n + 1);
            }

            offsets.add(offset);
        }

        return offset;
    }

    for (let mention of intermediateMentions) {
        let mentionText;
        if (mention.__typename === 'User') {
            mentionText = '@' + mention.name;
        } else if (mention.__typename === 'Organization') {
            mentionText = '@' + mention.name;
        } else if (mention.__typename === 'SharedRoom') {
            mentionText = '@' + mention.title;
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
                    },
                });
            } else if (mention.__typename === 'Organization') {
                spans.push({
                    __typename: 'MessageSpanOrganizationMention',
                    offset: index,
                    length: mentionText.length,
                    organization: {
                        __typename: 'Organization',
                        id: mention.id,
                        name: mention.name,
                    },
                });
            } else if (mention.__typename === 'SharedRoom') {
                spans.push({
                    __typename: 'MessageSpanRoomMention',
                    offset: index,
                    length: mentionText.length,
                    room: {
                        __typename: 'SharedRoom',
                        id: mention.id,
                        title: mention.title,
                        isPremium: mention.isPremium,
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

export const prepareLegacyMentionsForSend = (
    message: string,
    intermediateMentions: MentionToSend[],
): MentionInput[] => {
    let preparedMentions: MentionInput[] = [];
    let legacyMentions = prepareLegacyMentions(message, intermediateMentions);

    legacyMentions.map((m) => {
        if (m.__typename === 'MessageSpanUserMention') {
            preparedMentions.push({
                offset: m.offset,
                length: m.length,
                userId: m.user.id,
            });
        } else if (m.__typename === 'MessageSpanOrganizationMention') {
            preparedMentions.push({
                offset: m.offset,
                length: m.length,
                orgId: m.organization.id,
            });
        } else if (m.__typename === 'MessageSpanRoomMention') {
            preparedMentions.push({
                offset: m.offset,
                length: m.length,
                chatId: m.room.id,
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

export const convertMentionsFromMessage = (
    text?: string | null,
    spans?: SpanMentionsT,
): MentionToSend[] => {
    let res: MentionToSend[] = [];

    (spans || []).map((s) => {
        if (s.__typename === 'MessageSpanUserMention') {
            if ((text || '').substr(s.offset, s.length).toLowerCase() === '@all') {
                res.push({
                    __typename: 'AllMention',
                });
            } else {
                res.push({
                    __typename: 'User',
                    id: s.user.id,
                    name: s.user.name,
                });
            }
        } else if (s.__typename === 'MessageSpanOrganizationMention') {
            res.push({
                __typename: 'Organization',
                id: s.organization.id,
                name: s.organization.name,
            });
        } else if (s.__typename === 'MessageSpanRoomMention') {
            res.push({
                // __typename: 'SharedRoom',
                ...s.room,
            } as ChatMentionSearch_mentions_items_MentionSearchSharedRoom_room);
        } else if (s.__typename === 'MessageSpanAllMention') {
            res.push({
                __typename: 'AllMention',
            });
        }
    });

    return res;
};
