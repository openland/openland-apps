import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { API_ENDPOINT } from './endpoint';
// import { WebSocketLink } from 'apollo-link-ws';
// import { API_ENDPOINT_WS } from './endpoint';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

let cachedClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const buildClient = (initialState?: any, token?: string, org?: string) => {
    var headers: any = {};
    if (token) {
        headers['x-openland-token'] = token;
    }
    if (org) {
        headers['x-openland-org'] = org;
    }
    var cache = new InMemoryCache();
    if (initialState) {
        cache = cache.restore(initialState);
    }

    // Basic Link
    const httpLink = new HttpLink({
        uri: API_ENDPOINT,
        headers: headers,
        fetch: require('isomorphic-unfetch'),
    });

    let link: any = httpLink;

    // // Use Web Socket if in browser
    // if (canUseDOM) {
    //     link = new WebSocketLink({
    //         uri: API_ENDPOINT_WS!!,
    //         options: {
    //             reconnect: true
    //         }
    //     });
    // }

    return new ApolloClient({
        link: link,
        cache: cache,
        ssrMode: !canUseDOM,
        connectToDevTools: false
    });
};

export const apolloClient = (initialState?: any, token?: string, org?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            cachedClient = buildClient(initialState, token, org);
        }
        return cachedClient!!;
    } else {
        return buildClient(initialState, token, org);
    }
};