import { SRouter } from 'react-native-s/SRouter';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { UserShort } from 'openland-api/spacex.types';
import { RoomMemberType, OrgMemberType, RoomLongPressHanlder, OrgLongPressHanlder } from './MembersSearch';

export const Modals = {
    showGroupMuptiplePicker(
        router: SRouter,
        action: {
            title: string,
            action: (users: UserShort[]) => any,
            titleEmpty?: string,
            actionEmpty?: () => void,
        },
        title?: string,
        pushAndReset?: boolean
    ) {
        if (pushAndReset) {
            router.pushAndReset('GroupMultiplePicker', { action, title });
        } else {
            router.push('GroupMultiplePicker', { action, title });
        }
    },
    showUserMuptiplePicker(
        router: SRouter | NavigationManager,
        action: {
            title: string,
            action: (users: UserShort[]) => any,
            titleEmpty?: string,
            actionEmpty?: () => void,
        },
        title?: string,
        disableUsers?: string[],
        excludeUsers?: string[],
        inviteLinkButton?: {
            path: String,
            pathParams: any,
            onPress?: () => void,
        },
        pushAndReset?: boolean
    ) {
        if (pushAndReset) {
            router.pushAndReset('UserMultiplePicker', { action, title, disableUsers, excludeUsers, inviteLinkButton });
        } else {
            router.push('UserMultiplePicker', { action, title, disableUsers, excludeUsers, inviteLinkButton });
        }
    },
    showUserPicker(
        router: SRouter,
        action: (user: UserShort) => any,
        users: UserShort[],
        title?: string,
        selectedUser?: string,
        disableUsers?: string[],
        pushAndReset?: boolean
    ) {
        if (pushAndReset) {
            router.pushAndReset('UserPicker', { action, title, users, selectedUser, disableUsers });
        } else {
            router.push('UserPicker', { action, title, users, selectedUser, disableUsers });
        }
    },
    showCountryPicker(
        router: SRouter,
        action: (value: { label: string, value: string, shortname: string }) => any,
    ) {
        router.present('CountryPicker', { action });
    },
    showFilePreview(router: SRouter, uuid: string, name: string, size: number) {
        router.push('FilePreview', { config: { uuid, name, size } });
    },
    showRoomMembersSearch({ router, roomId, membersCount, initialMembers, onPress, onLongPress }: {
        router: SRouter,
        roomId: string,
        membersCount: number,
        initialMembers?: RoomMemberType[],
        onPress: (member: RoomMemberType) => void,
        onLongPress: RoomLongPressHanlder,
    }
    ) {
        router.push('MembersSearch', { roomId, membersCount, initialMembers, onPress, onLongPress });
    },
    showOrgMembersSearch({ router, orgId, membersCount, initialMembers, onPress, onLongPress }: {
        router: SRouter,
        orgId: string,
        membersCount: number,
        initialMembers?: OrgMemberType[],
        onPress: (member: OrgMemberType) => void,
        onLongPress: OrgLongPressHanlder,
    }
    ) {
        router.push('MembersSearch', { orgId, membersCount, initialMembers, onPress, onLongPress });
    },
    showReportSpam({ router, userId }: { router: SRouter, userId: string }) {
        router.push('ReportSpam', { userId });
    }
};
