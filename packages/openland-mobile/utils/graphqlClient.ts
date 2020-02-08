import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/spacex';

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

export function getClient(unsafe?: boolean): OpenlandClient {
    if (!cachedClient && !unsafe) {
        throw Error('Client is not inited');
    }
    return cachedClient!;
}

export function resetClient() {
    if (cachedClient) {
        cachedClient.close();
        cachedClient = null;
    }
}