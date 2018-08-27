import { NativeEventEmitter, NativeModules, Platform, DeviceEventEmitter } from 'react-native';

const ASNativeEmitter = new NativeEventEmitter(NativeModules.RNAsyncViewEventEmitter);

export class ASEventEmitterHolder {
    private onPress = new Map<string, () => void>();

    constructor() {
        if (Platform.OS === 'ios') {
            ASNativeEmitter.addListener('onPress', (key: string) => {
                let p = this.onPress.get(key);
                if (p) {
                    p();
                }
            });
        } else {
            DeviceEventEmitter.addListener('async_on_press', (args: { key: string }) => {
                let p = this.onPress.get(args.key);
                if (p) {
                    p();
                }
            });
        }
    }

    registerOnPress = (key: string, handler: () => void) => {
        this.onPress.set(key, handler);
    }
    unregisterOnPress = (key: string) => {
        this.onPress.delete(key);
    }
}

export const ASEventEmitter = new ASEventEmitterHolder();