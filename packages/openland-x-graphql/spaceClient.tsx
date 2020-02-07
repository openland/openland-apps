import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createWorkerClient } from 'openland-web/api/createWorkerClient';
import { SpaceXWebClient } from 'openland-graphql/spacex/SpaceXWebClient';
import { Operations } from 'openland-api/Client';
import { createGraphqlEngine } from 'openland-api/createGraphqlEngine';

let cachedClient: OpenlandClient | undefined = undefined;

export const spaceClient = (token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            let httpEndpoint = '/graphql';
            let wsEndpoint = loadConfig().webSocketEndpoint!;
            const client = createWorkerClient(httpEndpoint, wsEndpoint, token);
            cachedClient = new OpenlandClient(createGraphqlEngine(client));
            // cachedClient = new OpenlandClient(createGraphqlEngine(new SpaceXWebClient(Operations, wsEndpoint, token)));
            Track.setClient(cachedClient);
        }
        return cachedClient!!;
    } else {
        let wsEndpoint: string;
        if (canUseDOM) {
            wsEndpoint = loadConfig().webSocketEndpoint!;
        } else {
            wsEndpoint = process.env.API_WS_ENDPOINT
                ? process.env.API_WS_ENDPOINT
                : 'ws://localhost:9000/api';
        }
        console.warn(wsEndpoint);
        return new OpenlandClient(createGraphqlEngine(new SpaceXWebClient(Operations, wsEndpoint, token)));
    }
};
