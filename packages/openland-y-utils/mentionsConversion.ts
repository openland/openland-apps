import { MentionInput, UserShort } from 'openland-api/Types';

export type UserWithOffset = {
    user: UserShort;
    offset: number;
    length: number;
}

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
