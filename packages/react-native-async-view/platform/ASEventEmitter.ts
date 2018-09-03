import { NativeEventEmitter, NativeModules, Platform, DeviceEventEmitter } from 'react-native';

const ASNativeEmitter = new NativeEventEmitter(NativeModules.RNAsyncViewEventEmitter);

export class ASEventEmitterHolder {
    private onPress = new Map<string, (event: { key: string, x: number, y: number, w: number, h: number }) => void>();
    private onLoadMore = new Map<string, () => void>();

    constructor() {
        if (Platform.OS === 'ios') {
            ASNativeEmitter.addListener('onPress', (args: { key: string, x: number, y: number, w: number, h: number }) => {
                let p = this.onPress.get(args.key);
                if (p) {
                    p(args);
                }
            });
            ASNativeEmitter.addListener('onLoadMore', (key: string) => {
                let p = this.onLoadMore.get(key);
                if (p) {
                    p();
                }
            });
        } else {
            DeviceEventEmitter.addListener('async_on_press', (args: { key: string, x: number, y: number, w: number, h: number }) => {
                let p = this.onPress.get(args.key);
                if (p) {
                    p(args);
                }
            });
        }
    }

    registerOnPress = (key: string, handler: (event: { key: string, x: number, y: number, w: number, h: number }) => void) => {
        this.onPress.set(key, handler);
    }
    unregisterOnPress = (key: string) => {
        this.onPress.delete(key);
    }

    registerOnLoadMore = (key: string, handler: () => void) => {
        this.onLoadMore.set(key, handler);
    }
    unregisterOnLoadMore = (key: string) => {
        this.onLoadMore.delete(key);
    }
}

export const ASEventEmitter = new ASEventEmitterHolder();