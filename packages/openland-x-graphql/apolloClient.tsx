import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
// import { createWorkerClient } from 'openland-web/api/createWorkerClient';
import { SpaceXWebClient } from 'openland-graphql/spacex/SpaceXWebClient';
import { Operations } from 'openland-api/Client';

let cachedClient: OpenlandClient | undefined = undefined;

export const apolloClient = (token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            // let httpEndpoint = '/graphql';
            let wsEndpoint = loadConfig().webSocketEndpoint!;
            // const client = createWorkerClient(httpEndpoint, wsEndpoint, token);
            cachedClient = new OpenlandClient(new SpaceXWebClient(Operations, wsEndpoint, token));
            Track.setClient(cachedClient);
        }
        return cachedClient!!;
    } else {
        let endpoing = process.env.API_ENDPOINT
            ? process.env.API_ENDPOINT + '/api'
            : 'http://localhost:9000/api';
        return new OpenlandClient(new SpaceXWebClient(Operations, endpoing, token));
    }
};
