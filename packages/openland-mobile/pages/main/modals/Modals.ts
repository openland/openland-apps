import { SRouter } from 'react-native-s/SRouter';
import { UserShort } from 'openland-api/Types';

export const Modals = {
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
        inviteLinkButton?: {
            path: String,
            pathParams: any,
            onPress?: () => void,
        },
        pushAndReset?: boolean
    ) {
        if (pushAndReset) {
            router.pushAndReset('UserMultiplePicker', { action, title, disableUsers, inviteLinkButton });
        } else {
            router.push('UserMultiplePicker', { action, title, disableUsers, inviteLinkButton });
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
    showCountryPicker(router: SRouter, action: (value: string) => any) {
        router.push('CountryPicker', { 'action': action });
    },
    showFilePreview(router: SRouter, uuid: string, name: string, size: number) {
        router.push('FilePreview', { config: { uuid, name, size } });
    },
    showPdfPreview(router: SRouter, uuid: string, name: string, size: number) {
        router.push('PdfPreview', { config: { uuid, name, size } });
    }
};