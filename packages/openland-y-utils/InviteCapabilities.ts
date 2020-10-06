import { RoomMemberRole } from 'openland-api/spacex.types';

interface Organization {
    isAdmin: boolean;
    membersCanInvite: boolean;
}

interface Chat {
    __typename: 'SharedRoom';
    organization: Organization | null;
    isPremium: boolean;
    role: RoomMemberRole;
}

interface ChatPrivate {
    __typename: 'PrivateRoom';
}

interface GroupInviteCapabilities {
    canAddDirectly: boolean;
    canGetInviteLink: boolean;
}

export const groupInviteCapabilities = (chat: Chat | ChatPrivate): GroupInviteCapabilities => {
    if (chat.__typename !== 'SharedRoom') {
        return { canAddDirectly: false, canGetInviteLink: false };
    }

    if (chat.role !== RoomMemberRole.MEMBER || (chat.organization && chat.organization.isAdmin)) {
        return { canAddDirectly: true, canGetInviteLink: true };
    }

    if (chat.organization && !chat.organization.membersCanInvite) {
        return { canAddDirectly: false, canGetInviteLink: false };
    }

    if (chat.isPremium) {
        return { canAddDirectly: false, canGetInviteLink: true };
    }

    return { canAddDirectly: true, canGetInviteLink: true };
};