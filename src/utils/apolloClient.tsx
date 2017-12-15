import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { canUseDOM } from './environment';
import { API_ENDPOINT } from './endpoint';
import 'isomorphic-fetch';

let cachedClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const buildClient = (domain: string, initialState?: any, token?: string) => {
    var headers: any = {};
    headers['x-statecraft-domain'] = domain;
    if (token) {
        headers.authorization = 'Bearer ' + token;
    }
    var cache = new InMemoryCache();
    if (initialState) {
        cache = cache.restore(initialState);
    }
    return new ApolloClient({
        link: new HttpLink({
            uri: API_ENDPOINT + '/api',
            headers: headers
        }),
        cache: cache,
        ssrMode: canUseDOM,
        connectToDevTools: false
    });
};

export const apolloClient = (domain: string, initialState?: any, token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            cachedClient = buildClient(domain, initialState, token);
        }
        return cachedClient!!;
    } else {
        return buildClient(domain, initialState, token);
    }
};