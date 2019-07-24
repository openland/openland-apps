import { RoomMembers_members } from 'openland-api/Types';

export const searchMentions = (word: string, members: RoomMembers_members[]): RoomMembers_members[] => {
    const res: RoomMembers_members[] = [];
    const searchString = word.replace('@', '').toLowerCase();

    members.map(member => {
        const { firstName, lastName, shortname } = member.user;
        const hasInFirstName = firstName.toLowerCase().startsWith(searchString);
        const hasInLastName = lastName ? lastName.toLowerCase().startsWith(searchString) : false;
        const hasInShortname = shortname ? shortname.toLowerCase().startsWith(searchString) : false;

        if (hasInFirstName || hasInLastName || hasInShortname) {
            res.push(member);
        }
    });

    return res;
};