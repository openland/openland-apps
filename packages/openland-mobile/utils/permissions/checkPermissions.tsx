import { Platform, PermissionsAndroid } from 'react-native';
import { handlePermissionDismiss, permissionsType } from './handlePermissionDismiss';

const checkStoragePermissions = async () => {
    let hasPermissions = false;

    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                hasPermissions = true;
            } else {
                handlePermissionDismiss('android-storage');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        hasPermissions = true;
    }

    return hasPermissions;
}

export const checkPermissions = async (permission: permissionsType) => {
    if (permission === 'android-storage') {
        return await checkStoragePermissions();
    }

    return false;
}