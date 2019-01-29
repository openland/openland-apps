import { buildClient } from 'openland-y-graphql/apolloClient';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { WorkerApolloClient } from 'openland-mobile/apollo/ThreadedApolloClient';

let cachedClient: OpenlandClient | null;

export function saveClient(client: OpenlandClient) {
    cachedClient = client;
    Track.setClient(cachedClient);
}

export function getClient(): OpenlandClient {
    if (!cachedClient) {
        throw Error('Apollo is not inited');
    }
    return cachedClient;
}

export function buildNativeClient(token: string) {
    return new OpenlandClient(new WorkerApolloClient(token));
}