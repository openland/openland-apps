import { SRouter } from 'react-native-s/SRouter';
import { UserShort } from 'openland-api/Types';

export const Modals = {
    showTextEdit(router: SRouter, defaultValue: string, action: (value: string) => any) {
        router.push('TextEditModal', { 'value': defaultValue, 'action': action });
    },
    showUserPicker(router: SRouter, action: (value: UserShort) => any, autoclose?: boolean) {
        router.push('UserPicker', { 'action': action, autoclose });
    },
    showUserMuptiplePicker(router: SRouter, action: { title: string, action: (users: UserShort[]) => any }, title?: string, disableUsers?: string[]) {
        router.push('UserMultiplePicker', { action, title, disableUsers });
    },
    showCountryPicker(router: SRouter, action: (value: string) => any) {
        router.push('CountryPicker', { 'action': action });
    },
    showPicturePreview(router: SRouter, uuid: string, width: number, height: number, animate?: { x: number, y: number, width: number, height: number }) {
        router.push('PicturePreview', { uuid, width, height, animate });
    },
    showFilePreview(router: SRouter, uuid: string, name: string, size: number) {
        router.push('FilePreview', { config: { uuid, name, size } });
    }
};