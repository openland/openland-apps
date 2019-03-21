import { Platform, PermissionsAndroid, Permission } from 'react-native';
import { handlePermissionDismiss, permissionsType } from './handlePermissionDismiss';

const nativePermissionChecker = async (nativePermission: Permission | Permission[], simplePermissionType: permissionsType) => {
    let hasPermissions = false;

    if (Platform.OS === 'android') {
        try {
            if (typeof nativePermission !== 'string') {
                const granted = await PermissionsAndroid.requestMultiple(nativePermission);

                hasPermissions = true;

                Object.keys(granted).map((k) => {
                    if (granted[k] !== PermissionsAndroid.RESULTS.GRANTED) {
                        hasPermissions = false;
                    }
                })

                if (!hasPermissions) {
                    handlePermissionDismiss(simplePermissionType);
                }
            } else {
                const granted = await PermissionsAndroid.request(nativePermission);

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    hasPermissions = true;
                } else {
                    handlePermissionDismiss(simplePermissionType);
                }
            }
        } catch (error) {
            console.warn(error);
        }
    } else {
        hasPermissions = true;
    }

    return hasPermissions;
}

export const checkPermissions = async (permission: permissionsType) => {
    if (permission === 'android-storage') {
        return await nativePermissionChecker(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 'android-storage');
    }

    if (permission === 'gallery') {
        return await nativePermissionChecker(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 'gallery');
    }

    if (permission === 'camera') {
        return await nativePermissionChecker([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ], 'camera');
    }

    return false;
}