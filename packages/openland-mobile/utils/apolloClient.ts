import { buildClient } from 'openland-y-graphql/apolloClient';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { WorkerApolloClient } from 'openland-mobile/apollo/ThreadedApolloClient';
import { ApolloGraphqlClient } from 'openland-graphql/ApolloGraphqlClient';
import { Platform } from 'react-native';
import { NativeApolloClient } from 'openland-mobile/apollo/NativeApolloClient';

let cachedClient: OpenlandClient | null;

export function saveClient(client: OpenlandClient) {
    if (cachedClient) {
        throw Error('Apollo already inited');
    }
    cachedClient = client;
    Track.setClient(cachedClient);
}

export function hasClient() {
    return !!cachedClient;
}

export function getClient(): OpenlandClient {
    if (!cachedClient) {
        throw Error('Apollo is not inited');
    }
    return cachedClient;
}

export function buildNativeClient(token: string) {

    if (Platform.OS === 'android') {
        return new OpenlandClient(new NativeApolloClient(token));
    }

    if (__DEV__) {
        return new OpenlandClient(new ApolloGraphqlClient(buildClient({
            token: token,
            endpoint: 'https://api.openland.com/api',
            wsEndpoint: 'wss://api.openland.com/api'
        })));
    }
    return new OpenlandClient(new WorkerApolloClient(token));

    // if (Platform.OS !== 'android') {
    //     return new OpenlandClient(new WorkerApolloClient(token));
    // } else {
    //     return new OpenlandClient(new ApolloGraphqlClient(buildClient({
    //         token: token,
    //         endpoint: 'https://api.openland.com/api',
    //         wsEndpoint: 'wss://api.openland.com/api'
    //     })));
    // }
    // return new OpenlandClient(new ApolloGraphqlClient(buildClient({
    //     token: token,
    //     endpoint: 'https://api.openland.com/api',
    //     wsEndpoint: 'wss://api.openland.com/api'
    // })));

    // return new OpenlandClient(new WorkerApolloClient(token));
}