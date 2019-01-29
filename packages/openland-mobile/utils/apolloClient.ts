import { buildClient } from 'openland-y-graphql/apolloClient';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { ApolloGraphqlClient } from 'openland-graphql/ApolloGraphqlClient';

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
    return new OpenlandClient(new ApolloGraphqlClient(buildClient({
        token: token,
        endpoint: 'https://api.openland.com/api',
        wsEndpoint: 'wss://api.openland.com/api'
    })));
}