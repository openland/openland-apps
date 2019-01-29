import { SRouter } from 'react-native-s/SRouter';
import { UserShort } from 'openland-api/Types';

export const Modals = {
    showUserMuptiplePicker(router: SRouter, action: { title: string, action: (users: UserShort[]) => any }, title?: string, disableUsers?: string[], inviteLinkButton?: { path: String, pathParams: any }) {
        router.push('UserMultiplePicker', { action, title, disableUsers, inviteLinkButton });
    },
    showCountryPicker(router: SRouter, action: (value: string) => any) {
        router.push('CountryPicker', { 'action': action });
    },
    showFilePreview(router: SRouter, uuid: string, name: string, size: number) {
        router.push('FilePreview', { config: { uuid, name, size } });
    }
};