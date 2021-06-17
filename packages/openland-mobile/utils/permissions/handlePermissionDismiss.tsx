import { Platform, Linking } from 'react-native';
import Alert from 'openland-mobile/components/AlertBlanket';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { t } from 'openland-mobile/text/useText';

export type permissionsType = 'gallery' | 'gallery-add' | 'microphone' | 'camera' | 'android-storage' | 'contacts';

interface AlertOpenSettingsLabels {
    ios?: {
        title: string,
        message?: string,
    };
    android?: {
        title: string,
        message?: string,
    };
}

const AlertOpenSettings = (labels: AlertOpenSettingsLabels) => {
    if (labels.ios && Platform.OS === 'ios') {
        const builder = Alert.builder();

        builder.title(labels.ios.title);

        if (labels.ios.message) {
            builder.message(labels.ios.message);
        }
        builder.button(t('cancel', 'Cancel'), 'cancel');
        builder.button(t('settings', 'Settings'), 'default', () => (Linking.openURL('app-settings:')));
        builder.show();
    }

    if (labels.android && Platform.OS === 'android') {
        const builder = Alert.builder();

        builder.title(labels.android.title);

        if (labels.android.message) {
            builder.message(labels.android.message);
        }

        builder.button(t('settings', 'Settings'), 'default', () => (AndroidOpenSettings.appDetailsSettings()));
        builder.show();
    }
};

export const handlePermissionDismiss = (permission: permissionsType) => {
    if (permission === 'contacts') {
        AlertOpenSettings({
            ios: {
                title: t('permissionContactsIOS', 'Allow Openland access to your contacts'),
                message: t('permissionContactsInstructionsIOS', 'Go to your device’s settings, tap Openland and turn on Contacts'),
            },
            android: {
                title: t('permissionContactsAndroid', 'Allow Openland to access your phone\'s contacts?'),
                message: t('permissionContactsInstructionsAndroid', 'To share photos, allow Openland access to your library. Tap Settings > Permissions, and turn on Contacts.'),
            }
        });
    }
    if (permission === 'gallery' || permission === 'gallery-add') {
        AlertOpenSettings({
            ios: {
                title: t('permissionGalleryIOS', 'Allow Openland access to your photos'),
                message: t('permissionGalleryInstructionsIOS', 'Go to your device’s settings, tap Openland and turn on Photos'),
            },
            android: {
                title: t('permissionGalleryAndroid', 'Allow Openland to access your phone\'s storage?'),
                message: t('permissionGalleryInstructionsAndroid', 'To share photos, allow Openland access to your library. Tap Settings > Permissions, and turn on Storage.'),
            }
        });
    } else if (permission === 'microphone') {
        AlertOpenSettings({
            ios: {
                title: t('permissionMicrophoneIOS', 'Allow Openland access to your microphone'),
                message: t('permissionMicrophoneInstructionsIOS', 'Go to your device’s settings, tap Openland and turn on Microphone'),
            },
            android: {
                title: t('permissionMicrophoneAndroid', 'Allow Openland to access your microphone?'),
                message: t('permissionMicrophoneInstructionsAndroid', 'To allow Openland access to your microphone, tap Settings > Permissions, and turn on Microphone.'),
            }
        });
    } else if (permission === 'camera') {
        AlertOpenSettings({
            ios: {
                title: t('permissionCameraIOS', 'Allow Openland access to your camera'),
                message: t('permissionCameraInstructionsIOS', 'Go to your device’s settings, tap Openland and turn on Camera'),
            },
            android: {
                title: t('permissionCameraAndroid', 'Allow Openland to take pictures and record video?'),
                message: t('permissionCameraInstructionsAndroid', 'To upload a photo or video, allow Openland access to your camera and storage. Tap Settings > Permissions, and turn on Camera and Storage.'),
            }
        });
    } else if (permission === 'android-storage') {
        AlertOpenSettings({
            android: {
                title: t('permissionStorageAndroid', 'Allow Openland to access your phone\'s storage?'),
                message: t('permissionStorageInstructionsAndroid', 'To share documents, allow Openland access to your storage. Tap Settings > Permissions, and turn on Storage.'),
            }
        });
    }
};