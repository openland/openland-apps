import {
    Room_room_SharedRoom_members,
    Room_room_SharedRoom,
    UserShort,
} from 'openland-api/Types';

const containsMember = (
    members: Room_room_SharedRoom_members[],
    findMember: UserShort,
) => {
    let result = false;

    members.forEach(member => {
        if (member.user.id === findMember.id) {
            result = true;
        }
    });

    return result;
};

const addIfNew = (arrayToAdd: any, arrayWithIds: string[], user: { id: string }) => {
    if (arrayWithIds.indexOf(user.id) === -1) {
        arrayToAdd.push(user);
        arrayWithIds.push(user.id);
    }
};

export const getWelcomeMessageSenders = ({ chat, admins }: { chat?: Room_room_SharedRoom, admins?: UserShort[] }) => {
    const res: any[] = [];
    const addedIds: string[] = [];

    if (chat) {
        const adminMembers = admins || [];

        adminMembers.forEach((item: UserShort) => {
            if (containsMember(chat.members, item)) {
                addIfNew(res, addedIds, item);
            }
        });

        chat.members
            .filter((item: Room_room_SharedRoom_members) => item.role === 'OWNER')
            .forEach((item: Room_room_SharedRoom_members) => {
                addIfNew(res, addedIds, item.user);
            });
    }

    return res;
};
