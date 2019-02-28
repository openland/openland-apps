import * as React from 'react';
import { RoomMembers_members } from 'openland-api/Types';

export type MentionDataT = {
    id: string;
    name: string;
    avatar: string;
    title: string;
    online: boolean;
    isYou: boolean;
};

export type MentionsStateT = {
    mentionsData: MentionDataT[];
    listOfMembersNames: string[];
    getMentions: () => MentionDataT[];
    setCurrentMentions: (a: MentionDataT[]) => void;
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

const getMembers = (members?: RoomMembers_members[]) => {
    return members
        ? members.map(({ user: { name } }: { user: { name: string } }) => `@${name}`)
        : [];
};

type useMentionsT = {
    members?: RoomMembers_members[];
};

export function useMentions({ members }: useMentionsT) {
    const [listOfMembersNames, setListOfMembersNames] = React.useState(getMembers(members));
    const [currentMentions, setCurrentMentions] = React.useState<MentionDataT[]>([]);

    React.useEffect(() => {
        setListOfMembersNames(getMembers(members));
    }, [members]);

    const mentionsData = convertChannelMembersDataToMentionsData(members);

    const getMentions = () => {
        return currentMentions;
    };

    return { mentionsData, listOfMembersNames, getMentions, setCurrentMentions };
}
