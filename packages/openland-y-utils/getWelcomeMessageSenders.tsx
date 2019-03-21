import {
    Room_room_SharedRoom_members,
    Room_room_SharedRoom_organization_adminMembers,
    Room_room_SharedRoom,
} from 'openland-api/Types';

const containsMember = (members: Room_room_SharedRoom_members[], findMember: Room_room_SharedRoom_organization_adminMembers) => {
    let result = false;

    members.forEach((member) => {
        if (member.user.id === findMember.user.id) {
            result = true;
        }
    });

    return result;
}

const addIfNew = (arrayToAdd: any, arrayWithIds: string[], user: { id: string }) => {
    if (arrayWithIds.indexOf(user.id) === -1) {
        arrayToAdd.push(user);
        arrayWithIds.push(user.id);
    }
};

export const getWelcomeMessageSenders = ({ chat }: { chat?: Room_room_SharedRoom }) => {
    const res: any[] = [];
    const addedIds: string[] = [];

    if (chat) {
        const adminMembers = chat.organization ? chat.organization!!.adminMembers : [];

        adminMembers.forEach((item: Room_room_SharedRoom_organization_adminMembers) => {
            if (containsMember(chat.members, item)) {
                addIfNew(res, addedIds, item.user);
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
