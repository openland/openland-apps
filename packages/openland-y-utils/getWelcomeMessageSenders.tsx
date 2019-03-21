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

export const getWelcomeMessageSenders = ({ chat }: { chat?: Room_room_SharedRoom }) => {
    const res: any[] = [];
    const addedIds: string[] = [];

    if (chat) {
        const adminMembers = chat.organization ? chat.organization!!.adminMembers : [];
    
        adminMembers.forEach((admin: Room_room_SharedRoom_organization_adminMembers) => {
            if (containsMember(chat.members, admin)) {
                res.push(admin.user);
                addedIds.push(admin.user.id);
            }
        });
    
        chat.members.forEach((item: Room_room_SharedRoom_members) => {
            if (item.role === 'OWNER' && addedIds.indexOf(item.user.id) === -1) {
                res.push(item.user);
                addedIds.push(item.user.id);
            }
        });
    }

    return res;
};