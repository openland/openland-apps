import { WebEngine, PersistenceProvider, createCommonTransport } from '@openland/spacex-web';
import { openWebStorage } from 'openland-api/storage/openWebStorage';
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

    // Create transport
    const transport = createCommonTransport({
        url: endpoint,
        mode: 'openland',
        thruster: true,
        thrusterBuckets: [1000, 3000, 10000],
        connectionParams: { ['x-openland-token']: token }
    });

    return new WebEngine({
        definitions: require('./spacex.descriptor.json'),
        transport,
        persistence
    });
};
