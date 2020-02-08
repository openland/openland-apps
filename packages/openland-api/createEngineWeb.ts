import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { createEngineWebWorker } from 'openland-api/createEngineWebWorker';
import { WebEngine } from '@openland/spacex';
import { Definitions } from './spacex.web';

export const createEngineWeb = (endpoint: string, token?: string) => {
    if (canUseDOM) {
        return createEngineWebWorker(endpoint, token);
    } else {
        return new WebEngine(Definitions, {
            endpoint: endpoint,
            connectionParams: { ['x-openland-token']: token }
        });
    }
};
