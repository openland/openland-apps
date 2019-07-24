import { RoomMembers_members } from 'openland-api/Types';

export const searchMentions = (word: string, members: RoomMembers_members[]): RoomMembers_members[] => {
    const res: RoomMembers_members[] = [];
    const searchString = word.replace('@', '').toLowerCase();

    members.map(member => {
        const { name, lastName, shortname } = member.user;
        const lowerName = name.toLowerCase();
        const lowerLastName = lastName ? lastName.toLowerCase() : '';
        const lowerShortname = shortname ? shortname.toLowerCase() : '';

        const inName = lowerName.startsWith(searchString);
        const inLastName = lowerLastName.startsWith(searchString);
        const inShortname = lowerShortname.startsWith(searchString);
        const inNameAndLastName = searchString.length >= 2 && lowerName.startsWith(searchString[0]) && lowerLastName.startsWith(searchString.substr(1));

        if (inName || inLastName || inShortname || inNameAndLastName) {
            res.push(member);
        }
    });

    return res;
};