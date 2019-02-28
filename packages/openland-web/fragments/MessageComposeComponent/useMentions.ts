import * as React from 'react';
import { RoomMembers_members } from 'openland-api/Types';
import { InputMethodsStateT } from './useInputMethods';

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
    inputMethodsState: InputMethodsStateT;
    inputValue: string;
};

export function useMentions({ members, inputMethodsState, inputValue }: useMentionsT) {
    const [listOfMembersNames, setListOfMembersNames] = React.useState(getMembers(members));
    const [currentMentions, setCurrentMentions] = React.useState([]);

    React.useEffect(() => {
        setListOfMembersNames(getMembers(members));
        setCurrentMentions(inputMethodsState.getMentions());
    }, [members, inputValue]);

    const mentionsData = convertChannelMembersDataToMentionsData(members);

    const getMentions = () => {
        return currentMentions;
    };

    return { mentionsData, listOfMembersNames, getMentions };
}
