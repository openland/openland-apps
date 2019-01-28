import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UserShort } from 'openland-api/Types';
import { MobileMessenger } from '../messenger/MobileMessenger';
import { OpenlandClient } from 'openland-api/OpenlandClient';

let cachedMessenger: MobileMessenger | null = null;

export function buildMessenger(client: OpenlandClient, user: UserShort) {
    return new MessengerEngine(client, user);
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