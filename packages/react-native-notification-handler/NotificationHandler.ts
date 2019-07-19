import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';

const NativeEmitter = new NativeEventEmitter(NativeModules.RNNotificationHandler);

export class EventEmitterHolder {

    constructor() {
        if (Platform.OS === 'ios') {
            NativeEmitter.addListener('onUrl', async (url: string) => {
                await (await resolveInternalLink(url, () => false, true))!();
            });
        }
    }

    init = () => {
        if (Platform.OS === 'ios') {
            NativeModules.RNNotificationHandler.requestInitialUrl();
        }
    }
}

export const NotificationHandler = new EventEmitterHolder();