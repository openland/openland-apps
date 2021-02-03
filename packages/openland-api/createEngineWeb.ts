import { openWebStorage } from 'openland-web/storage/openWebStorage';
import { WebEngine, PersistenceProvider } from '@openland/spacex';
import { Definitions } from './spacex.web';
import { createPersistenceProvider } from './createPersistenceProvider';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { isWebWorker } from 'openland-y-utils/isWebWorker';

export const createEngineWeb = (endpoint: string, generation: number, token?: string) => {
    let persistence: PersistenceProvider | undefined = undefined;

    // Enable experimental persistence
    if (token && (canUseDOM || isWebWorker)) {
        let storage = openWebStorage('graphql', generation);
        persistence = createPersistenceProvider(storage);
    }

    return new WebEngine(Definitions, {
        endpoint: endpoint,
        connectionParams: { ['x-openland-token']: token },
        protocol: 'openland',
        persistence
    });
};
