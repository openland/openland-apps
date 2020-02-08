import { createEngineWeb } from './createEngineWeb';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { Track } from 'openland-engines/Tracking';
import { OpenlandClient } from 'openland-api/spacex';
import { createEngineWebWorker } from 'openland-api/createEngineWebWorker';
import { createClient } from './createClient';

let cachedClient: OpenlandClient | undefined = undefined;

export const createClientWeb = (token?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            let endpoint = loadConfig().webSocketEndpoint!;
            cachedClient = createClient(createEngineWebWorker(endpoint, token));
            Track.setClient(cachedClient);
        }
        return cachedClient!!;
    } else {
        let endpoint: string;
        if (canUseDOM) {
            endpoint = loadConfig().webSocketEndpoint!;
        } else {
            endpoint = process.env.API_WS_ENDPOINT
                ? process.env.API_WS_ENDPOINT
                : 'ws://localhost:9000/api';
        }
        return createClient(createEngineWeb(endpoint, token));
    }
};
