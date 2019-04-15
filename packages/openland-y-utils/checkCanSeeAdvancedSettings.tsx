import { RoomWithoutMembers_room_SharedRoom } from 'openland-api/Types';
export const checkCanSeeAdvancedSettings = ({ chat }: { chat: RoomWithoutMembers_room_SharedRoom }) => {
    return !!(
        chat.role === 'OWNER' ||
        chat.role === 'ADMIN' ||
        (chat.organization && (chat.organization.isAdmin || chat.organization.isOwner))
    );
};
