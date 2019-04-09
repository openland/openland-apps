import { Platform, Linking } from 'react-native';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import AndroidOpenSettings from 'react-native-android-open-settings';

export type permissionsType = 'gallery' | 'gallery-add' | 'microphone' | 'camera' | 'android-storage';

interface AlertOpenSettingsLabels {
    ios?: {
        title: string,
        message?: string,
    },
    android?: {
        title: string,
        message?: string,
    }
}

const AlertOpenSettings = (labels: AlertOpenSettingsLabels) => {
    if (labels.ios && Platform.OS === 'ios') {
        const builder = Alert.builder();

        builder.title(labels.ios.title);

        if (labels.ios.message) {
            builder.message(labels.ios.message);
        }
        builder.button('Cancel', 'cancel');
        builder.button('Open settings', 'default', () => (Linking.openURL('app-settings:')));
        builder.show();
    }

    if (labels.android && Platform.OS === 'android') {
        const builder = Alert.builder();

        builder.title(labels.android.title);

        if (labels.android.message) {
            builder.message(labels.android.message);
        }

        builder.button('Settings', 'default', () => (AndroidOpenSettings.appDetailsSettings()));
        builder.show();
    }
}

export const handlePermissionDismiss = (permission: permissionsType) => {
    if (permission === 'gallery') {
        AlertOpenSettings({
            ios: {
                title: 'Allow Openland access to your photos',
                message: 'In iPhone settings, tap Openland and turn on Photos.'
            },
            android: {
                title: 'Allow Openland to access your phone\'s storage?',
                message: 'To share photos, allow Openland access to your library. Tap Settings > Permissions, and turn on Storage.'
            }
        });
    } else if (permission === 'gallery-add') {
        AlertOpenSettings({
            ios: {
                title: 'Allow Openland access to your photos',
                message: 'In iPhone settings, tap Openland and turn on Photos.'
            },
            android: {
                title: 'Allow Openland to access your phone\'s storage?',
                message: 'To save photos, allow Openland access to your library. Tap Settings > Permissions, and turn on Storage.'
            }
        });
    } else if (permission === 'microphone') {
        AlertOpenSettings({
            ios: {
                title: 'Allow Openland access to your microphone',
                message: 'In iPhone settings, tap Openland and turn on Microphone.'
            },
            android: {
                title: 'Allow Openland to access your microphone?',
                message: 'To allow Openland access to your microphone, tap Settings > Permissions, and turn on Microphone.'
            }
        });
    } else if (permission === 'camera') {
        AlertOpenSettings({
            ios: {
                title: 'Allow Openland access to your camera',
                message: 'In iPhone settings, tap Openland and turn on Camera.'
            },
            android: {
                title: 'Allow Openland to take pictures and record video?',
                message: 'To upload a photo or video, allow Openland access to your camera and storage. Tap Settings > Permissions, and turn on Camera and Storage.'
            }
        });
    } else if (permission === 'android-storage') {
        AlertOpenSettings({
            android: {
                title: 'Allow Openland to access your phone\'s storage?',
                message: 'To share documents, allow Openland access to your storage. Tap Settings > Permissions, and turn on Storage.'
            }
        });
    }
}