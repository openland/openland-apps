import * as React from 'react';
<<<<<<< HEAD
import { MentionsMembers_members } from 'openland-api/Types';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';
=======
import { RoomMembers_members } from 'openland-api/Types';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UserShort } from 'openland-api/Types';
>>>>>>> wip(web): web move to new mentions api

export type MentionsStateT = {
    mentionsData: UserWithOffset[];
    listOfMembersNames: string[];
    getMentions: () => UserWithOffset[];
    setCurrentMentions: (a: UserWithOffset[]) => void;
};

<<<<<<< HEAD
export const convertChannelMembersDataToMentionsData = (data?: MentionsMembers_members[]) => {
=======
export const convertChannelMembersDataToMentionsData = (
    data?: RoomMembers_members[],
): UserWithOffset[] => {
>>>>>>> wip(web): web move to new mentions api
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

const getMembers = (members?: MentionsMembers_members[]) => {
    return members
        ? members.map(({ user: { name } }: { user: { name: string } }) => `@${name}`)
        : [];
};

type useMentionsT = {
    members?: MentionsMembers_members[];
};

export function useMentions({ members }: useMentionsT) {
    const [listOfMembersNames, setListOfMembersNames] = React.useState(getMembers(members));
    const [currentMentions, setCurrentMentions] = React.useState<UserWithOffset[]>([]);

    React.useEffect(() => {
        setListOfMembersNames(getMembers(members));
    }, [members]);

    const mentionsData = convertChannelMembersDataToMentionsData(members);

    const getMentions = () => {
        console.log(currentMentions);
        return currentMentions;
    };

    return { mentionsData, listOfMembersNames, getMentions, setCurrentMentions };
}
