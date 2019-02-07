import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { OpenApolloClient, buildClient } from 'openland-y-graphql/apolloClient';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { ApolloGraphqlClient } from 'openland-graphql/ApolloGraphqlClient';

let cachedClient: OpenApolloClient | undefined = undefined;

const buildWebClient = (initialState?: any, token?: string) => {
    let httpEndpoint = '/graphql';
    let wsEndpoint = undefined;
    if (canUseDOM) {
        wsEndpoint = loadConfig().webSocketEndpoint;
    } else {
        httpEndpoint = (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/api' : 'http://localhost:9000/api');
    }

    return buildClient({ endpoint: httpEndpoint, wsEndpoint: wsEndpoint, initialState, token, ssrMode: !canUseDOM, fetch: !canUseDOM ? require('node-fetch') : undefined });
};

export const apolloClient = (initialState?: any, token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            cachedClient = buildWebClient(initialState, token);
            Track.setClient(new OpenlandClient(new ApolloGraphqlClient(cachedClient!)));
        }
        return cachedClient!!;
    } else {
        return buildWebClient(initialState, token);
    }
};