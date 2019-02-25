import { NativeModules, Platform } from 'react-native';

let RNSDeviceNative = NativeModules.RNSDevice;

export const RNSDevice = {
    proximityEnable: () => {
        if (Platform.OS === 'ios') {
            RNSDeviceNative.proximityEnable();
        }
    },
    proximityDisable: () => {
        if (Platform.OS === 'ios') {
            RNSDeviceNative.proximityDisable();
        }
    }
}