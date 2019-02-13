import * as React from 'react';
import { RoomMembers_members } from 'openland-api/Types';

const getMentions = (
    str: string,
    listOfMembersNames: string[],
    members?: RoomMembers_members[],
) => {
    if (!members) {
        return null;
    }

    const mentionsNames = listOfMembersNames.filter((name: string) => str.includes(name));
    return members
        .filter(({ user: { name } }) => mentionsNames.indexOf(`@${name}`) !== -1)
        .map(({ user }) => user);
};

export type MentionsStateT = {
    mentionsData: {
        id: string;
        name: string;
        avatar: string;
        title: string;
        online: boolean;
        isYou: boolean;
    }[];
    listOfMembersNames: string[];
    getMentions: Function;
};

const convertChannelMembersDataToMentionsData = (data?: RoomMembers_members[]) => {
    if (!data) {
        return [];
    }
    return data.map(({ user }: any) => {
        const { id, name, photo, online, isYou, primaryOrganization } = user;
        return {
            id,
            name: name,
            avatar: photo,
            title: primaryOrganization ? primaryOrganization.name : '',
            online,
            isYou,
        };
    });
};

export function useMentions({ members }: { members?: RoomMembers_members[] }) {
    let listOfMembersNames: string[] = [];

    React.useEffect(() => {
        listOfMembersNames = members
            ? members.map(({ user: { name } }: { user: { name: string } }) => `@${name}`)
            : [];
    }, [members]);

    const mentionsData = convertChannelMembersDataToMentionsData(members);

    return { mentionsData, listOfMembersNames, getMentions };
}
