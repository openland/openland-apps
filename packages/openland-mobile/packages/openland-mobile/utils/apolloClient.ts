import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

let cachedClient: ApolloClient<{}> | null;

export function saveClient(client: ApolloClient<{}>) {
    cachedClient = client;
}

export function getClient(): ApolloClient<{}> {
    if (!cachedClient) {
        throw Error('Apollo is not inited');
    }
    return cachedClient;
}

export function buildClient(token: string) {
    var headers: any = {};
    headers['x-openland-token'] = token;
    const httpLink = new HttpLink({
        uri: 'https://api.openland.com/api',
        headers: headers,
    });
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        ssrMode: false,
        connectToDevTools: false
    });
}