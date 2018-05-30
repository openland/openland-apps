import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { API_ENDPOINT } from './endpoint';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

let cachedClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const buildClient = (initialState?: any, token?: string) => {
    var headers: any = {};
    if (token) {
        headers['x-openland-token'] = token;
    }
    var cache = new InMemoryCache();
    if (initialState) {
        cache = cache.restore(initialState);
    }
    return new ApolloClient({
        link: new HttpLink({
            uri: API_ENDPOINT,
            headers: headers,
            fetch: require('isomorphic-unfetch'),
        }),
        cache: cache,
        ssrMode: !canUseDOM,
        connectToDevTools: false
    });
};

export const apolloClient = (initialState?: any, token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            cachedClient = buildClient(initialState, token);
        }
        return cachedClient!!;
    } else {
        return buildClient(initialState, token);
    }
};