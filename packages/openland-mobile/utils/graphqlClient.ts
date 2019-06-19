import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { NativeSpaceXClient } from 'openland-mobile/spacex/NativeSpaceXClient';

let cachedClient: OpenlandClient | null;

export function saveClient(client: OpenlandClient) {
    if (cachedClient) {
        throw Error('Client already inited');
    }
    cachedClient = client;
    Track.setClient(cachedClient);
}

export function hasClient() {
    return !!cachedClient;
}

export function getClient(): OpenlandClient {
    if (!cachedClient) {
        throw Error('Client is not inited');
    }
    return cachedClient;
}

export function buildNativeClient(storage?: string, token?: string) {
    return new OpenlandClient(new NativeSpaceXClient(storage, token));
}