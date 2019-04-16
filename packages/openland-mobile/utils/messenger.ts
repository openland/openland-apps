import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UserShort } from 'openland-api/Types';
import { MobileMessenger } from '../messenger/MobileMessenger';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { Platform } from 'react-native';
import { EngineOptions } from 'openland-engines/EnginesOptions';

let cachedMessenger: MobileMessenger | null = null;

export function buildMessenger(client: OpenlandClient, user: UserShort, opts?: Partial<EngineOptions>) {
    let platform = Platform.OS + ' ' + (__DEV__ ? 'debug' : 'release');

    return new MessengerEngine(client, user, platform, opts);
}

export function setMessenger(messenger: MobileMessenger) {
    cachedMessenger = messenger;
}

export function getMessenger() {
    if (!cachedMessenger) {
        throw Error('Messenger is not inited');
    }
    return cachedMessenger!!;
}