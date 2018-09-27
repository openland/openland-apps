import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { UserShort } from 'openland-api/Types';
import { MobileMessenger } from '../messenger/MobileMessenger';

let cachedMessenger: MobileMessenger | null = null;

export function buildMessenger(client: OpenApolloClient, user: UserShort) {
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