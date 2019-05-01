import { RoomMembers_members } from 'openland-api/Types';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

export type MentionsStateT = {
    getMentionsSuggestions: () => Promise<UserWithOffset[]>;
    getMentions: () => UserWithOffset[];
    setCurrentMentions: (a: UserWithOffset[]) => void;
};

type useMentionsT = {
    getMembers: () => Promise<RoomMembers_members[]>;
};

// TODO remove this
export const convertChannelMembersDataToMentionsData = (
    data?: RoomMembers_members[],
): UserWithOffset[] => {
    if (!data) {
        return [];
    }
    return data.map(({ user }: any) => {
        return {
            user: user,
            length: 0,
            offset: 0,
        };
    });
};

export function useMentions({ getMembers }: useMentionsT): MentionsStateT {
    const getMentions = () => {
        return [];
    };

    const setCurrentMentions = () => {
        return [];
    };

    const getMentionsSuggestions = async () => {
        const members = await getMembers();

        return convertChannelMembersDataToMentionsData(members);
    };

    return { getMentionsSuggestions, getMentions, setCurrentMentions };
}
