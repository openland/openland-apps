import { NativeEventEmitter, NativeModules, Platform, DeviceEventEmitter } from 'react-native';
import { ASPressEvent } from '../ASPressEvent';

const ASNativeEmitter = new NativeEventEmitter(NativeModules.RNAsyncViewEventEmitter);

export class ASEventEmitterHolder {
    private onPress = new Map<string, (event: ASPressEvent) => void>();
    private onLongPress = new Map<string, (event: ASPressEvent) => void>();
    private onLoadMore = new Map<string, () => void>();

    constructor() {
        if (Platform.OS === 'ios') {
            ASNativeEmitter.addListener('onPress', (args: ASPressEvent) => {
                let p = this.onPress.get(args.key);
                if (p) {
                    p(args);
                }
            });
            ASNativeEmitter.addListener('onLongPress', (args: ASPressEvent) => {
                let p = this.onLongPress.get(args.key);
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
            DeviceEventEmitter.addListener('async_on_press', (args: ASPressEvent) => {
                let p = this.onPress.get(args.key);
                if (p) {
                    p(args);
                }
            });

            DeviceEventEmitter.addListener('async_on_load_more', (args: { key: string }) => {
                let p = this.onLoadMore.get(args.key);
                if (p) {
                    p();
                }
            });
        }
    }

    registerOnPress = (key: string, handler: (event: ASPressEvent) => void) => {
        this.onPress.set(key, handler);
    }
    unregisterOnPress = (key: string) => {
        this.onPress.delete(key);
    }

    registerOnLongPress = (key: string, handler: (event: ASPressEvent) => void) => {
        this.onLongPress.set(key, handler);
    }
    unregisterOnLongPress = (key: string) => {
        this.onLongPress.delete(key);
    }

    registerOnLoadMore = (key: string, handler: () => void) => {
        this.onLoadMore.set(key, handler);
    }
    unregisterOnLoadMore = (key: string) => {
        this.onLoadMore.delete(key);
    }
}

export const ASEventEmitter = new ASEventEmitterHolder();