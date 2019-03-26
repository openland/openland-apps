import { buildClient } from 'openland-y-graphql/apolloClient';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';
import { createWorkerClient } from 'openland-mobile/apollo/createWorkerClient';
import { createDumbBridgeClient } from 'openland-graphql/proxy/DumbBridgeClient';
import { NativeApolloClient } from 'openland-mobile/apollo/NativeApolloClient';
import { Platform } from 'react-native';
// import { Platform } from 'react-native';

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

export function buildNativeClient(storage: string, token: string) {

    if (Platform.OS === 'ios') {
        return new OpenlandClient(new NativeApolloClient(storage, token));
    }

    // if (Platform.OS === 'android') {
    //     return new OpenlandClient(new NativeApolloClient(token));
    // }

    if (__DEV__) {
        return new OpenlandClient(createDumbBridgeClient(new DirectApollolClient(buildClient({
            token: token,
            endpoint: 'https://api.openland.com/api',
            wsEndpoint: 'wss://api.openland.com/api'
        }))));
    } else {
        return new OpenlandClient(createWorkerClient(token));
    }

    // return new OpenlandClient(createWorkerClient(token));

    // return new OpenlandClient(new DirectApollolClient(buildClient({
    //     token: token,
    //     endpoint: 'https://api.openland.com/api',
    //     wsEndpoint: 'wss://api.openland.com/api'
    // })));

    // return new OpenlandClient(createWorkerClient(token));

    // if (__DEV__) {
    //     return new OpenlandClient(new ApolloGraphqlClient(buildClient({
    //         token: token,
    //         endpoint: 'https://api.openland.com/api',
    //         wsEndpoint: 'wss://api.openland.com/api'
    //     })));
    // }
    // return new OpenlandClient(new WorkerApolloClient(token));

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