import { SRouter } from 'react-native-s/SRouter';
import { UserShort } from 'openland-api/Types';
import { SlideInputLocalAttachment } from 'openland-engines/feed/types';

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
        router: SRouter,
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
    showPostMentionPicker(
        router: SRouter,
        action: (item: SlideInputLocalAttachment) => any,
    ) {
        router.present('PostMentionPicker', { action });
    },
    showFilePreview(router: SRouter, uuid: string, name: string, size: number) {
        router.push('FilePreview', { config: { uuid, name, size } });
    }
};