import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { OpenApolloClient, buildClient } from 'openland-y-graphql/apolloClient';

let cachedClient: OpenApolloClient | undefined = undefined;

const buildWebClient = (initialState?: any, token?: string, org?: string) => {
    let httpEndpoint = '/graphql';
    let wsEndpoint = undefined;
    if (canUseDOM) {
        wsEndpoint = loadConfig().webSocketEndpoint;
    } else {
        httpEndpoint = (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/api' : 'http://localhost:9000/api');
    }

    return buildClient({ endpoint: httpEndpoint, wsEndpoint: wsEndpoint, initialState, token, organization: org });
};

export const apolloClient = (initialState?: any, token?: string, org?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            cachedClient = buildWebClient(initialState, token, org);
        }
        return cachedClient!!;
    } else {
        return buildWebClient(initialState, token, org);
    }
};