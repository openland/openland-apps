import { buildClient, OpenApolloClient } from 'openland-y-graphql/apolloClient';

let cachedClient: OpenApolloClient | null;

export function saveClient(client: OpenApolloClient) {
    cachedClient = client;
}

export function getClient(): OpenApolloClient {
    if (!cachedClient) {
        throw Error('Apollo is not inited');
    }
    return cachedClient;
}

export function buildNativeClient(token: string) {
    return buildClient({
        token: token,
        endpoint: 'https://api.openland.com/api',
        wsEndpoint: 'wss://api.openland.com/api'
    });
}