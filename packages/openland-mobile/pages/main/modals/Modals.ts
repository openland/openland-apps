import { NavigationScreenProp, NavigationState } from 'react-navigation';

export const Modals = {
    showTextEdit(navigator: NavigationScreenProp<NavigationState, any>, defaultValue: string, action: (value: string) => any) {
        navigator.navigate('TextEditModal', { 'value': defaultValue, 'action': action });
    },
    showUserPicker(navigator: NavigationScreenProp<NavigationState, any>, action: (value: string) => any) {
        navigator.navigate('UserPicker', { 'action': action });
    },
    showPicturePreview(navigator: NavigationScreenProp<NavigationState, any>, uuid: string, width: number, height: number, animate?: { x: number, y: number, width: number, height: number }) {
        navigator.navigate('PicturePreview', { uuid, width, height, animate });
    },
    showFilePreview(navigator: NavigationScreenProp<NavigationState, any>, uuid: string, name: string, size: number) {
        navigator.navigate('FilePreview', { config: { uuid, name, size } });
    }
};