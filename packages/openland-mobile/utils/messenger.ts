import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UserShort } from 'openland-api/Types';
import { MobileMessenger } from '../messenger/MobileMessenger';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { Platform } from 'react-native';

let cachedMessenger: MobileMessenger | null = null;

export function buildMessenger(client: OpenlandClient, user: UserShort) {
    let platform = Platform.OS + ' ' + (__DEV__ ? 'Debug' : 'Release');

    return new MessengerEngine(client, user, platform);
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