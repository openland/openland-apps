import * as React from 'react';
import { RoomMembers_members } from 'openland-api/Types';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

export type MentionsStateT = {
    listOfMembersNames: string[];
    mentionsData: UserWithOffset[];
    getMentions: () => UserWithOffset[];
    setCurrentMentions: (a: UserWithOffset[]) => void;
};

const getMembers = (members?: RoomMembers_members[]) => {
    return members
        ? members.map(({ user: { name } }: { user: { name: string } }) => `@${name}`)
        : [];
};

type useMentionsT = {
    members?: RoomMembers_members[];
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

export function useMentions({ members }: useMentionsT): MentionsStateT {
    const [listOfMembersNames, setListOfMembersNames] = React.useState(getMembers(members));
    const [currentMentions, setCurrentMentions] = React.useState<UserWithOffset[]>([]);
    const [mentionsData, setMentionsData] = React.useState<UserWithOffset[]>([]);

    React.useEffect(() => {
        setListOfMembersNames(getMembers(members));

        setMentionsData(convertChannelMembersDataToMentionsData(members));
    }, [members]);

    const getMentions = () => {
        return currentMentions;
    };

    return { mentionsData, listOfMembersNames, getMentions, setCurrentMentions };
}
