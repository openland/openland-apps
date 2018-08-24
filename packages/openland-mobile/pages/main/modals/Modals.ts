import { FastRouter } from 'react-native-fast-navigation/FastRouter';

export const Modals = {
    showTextEdit(router: FastRouter, defaultValue: string, action: (value: string) => any) {
        router.push('TextEditModal', { 'value': defaultValue, 'action': action });
    },
    showUserPicker(router: FastRouter, action: (value: string) => any) {
        router.push('UserPicker', { 'action': action });
    },
    showPicturePreview(router: FastRouter, uuid: string, width: number, height: number, animate?: { x: number, y: number, width: number, height: number }) {
        router.push('PicturePreview', { uuid, width, height, animate });
    },
    showFilePreview(router: FastRouter, uuid: string, name: string, size: number) {
        router.push('FilePreview', { config: { uuid, name, size } });
    }
};