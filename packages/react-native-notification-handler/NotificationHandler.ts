import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';

const NativeEmitter = new NativeEventEmitter(NativeModules.RNNotificationHandler);

export class EventEmitterHolder {

    constructor() {
        if (Platform.OS === 'ios') {
            NativeEmitter.addListener('onUrl', async (url: string) => {
                console.warn('boom', url);

                await (await resolveInternalLink(url, () => false))!();
            });
        }
    }

    init = () => {
        NativeModules.RNNotificationHandler.requestInitialUrl();
    }
}

export const NotificationHandler = new EventEmitterHolder();