import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { buildClient } from 'openland-y-graphql/apolloClient';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';
import { createWorkerClient } from 'openland-web/api/createWorkerClient';

let cachedClient: OpenlandClient | undefined = undefined;

const buildWebClient = (token?: string) => {
    let httpEndpoint = '/graphql';
    let wsEndpoint = undefined;
    if (canUseDOM) {
        wsEndpoint = loadConfig().webSocketEndpoint;
    } else {
        httpEndpoint = process.env.API_ENDPOINT
            ? process.env.API_ENDPOINT + '/api'
            : 'http://localhost:9000/api';
    }

    return buildClient({
        endpoint: httpEndpoint,
        wsEndpoint: wsEndpoint,
        token,
        ssrMode: !canUseDOM,
        fetch: !canUseDOM ? require('node-fetch') : undefined,
    });
};

export const apolloClient = (token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            let httpEndpoint = '/graphql';
            let wsEndpoint = loadConfig().webSocketEndpoint!;
            const client = createWorkerClient(httpEndpoint, wsEndpoint, token);
            cachedClient = new OpenlandClient(client);
            Track.setClient(cachedClient);
        }
        return cachedClient!!;
    } else {
        return new OpenlandClient(new DirectApollolClient(buildWebClient(token)));
    }
};
