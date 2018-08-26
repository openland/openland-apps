import { NativeEventEmitter, NativeModules } from 'react-native';

const ASNativeEmitter = new NativeEventEmitter(NativeModules.RNAsyncViewEventEmitter);

export class ASEventEmitterHolder {
    private onPress = new Map<string, () => void>();

    constructor() {
        ASNativeEmitter.addListener('onPress', (key: string) => {
            let p = this.onPress.get(key);
            if (p) {
                p();
            }
        });
    }

    registerOnPress = (key: string, handler: () => void) => {
        console.log('registerOnPress: ' + key);
        this.onPress.set(key, handler);
    }
    unregisterOnPress = (key: string) => {
        this.onPress.delete(key);
    }
}

export const ASEventEmitter = new ASEventEmitterHolder();