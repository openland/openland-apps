import { NavigationScreenProp, NavigationState } from 'react-navigation';

export const Modals = {
    showTextEdit(navigator: NavigationScreenProp<NavigationState, any>, defaultValue: string, action: (value: string) => any) {
        navigator.navigate('TextEditModal', { 'value': defaultValue, 'action': action });
    },
    showUserPicker(navigator: NavigationScreenProp<NavigationState, any>,  action: (value: string) => any) {
        navigator.navigate('UserPicker', { 'action': action });
    }
};