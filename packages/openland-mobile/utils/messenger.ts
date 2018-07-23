import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { UserShortFragment } from 'openland-api/Types';

let cachedMessenger: MessengerEngine | null = null;

export function buildMessenger(client: OpenApolloClient, user: UserShortFragment) {
    return new MessengerEngine(client, user);
}

export function setMessenger(messenger: MessengerEngine) {
    cachedMessenger = messenger;
}

export function getMessenger() {
    if (!cachedMessenger) {
        throw Error('Messenger is not inited');
    }
    return cachedMessenger!!;
}