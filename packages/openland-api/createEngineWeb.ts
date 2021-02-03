import { isElectron } from 'openland-y-utils/isElectron';
import { openWebStorage } from 'openland-web/storage/openWebStorage';
import { WebEngine, PersistenceProvider } from '@openland/spacex';
import sha256 from 'crypto-js/sha256';
import { Definitions } from './spacex.web';
import { createPersistenceProvider } from './createPersistenceProvider';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { isWebWorker } from 'openland-y-utils/isWebWorker';

export const createEngineWeb = (endpoint: string, generation: number, token?: string) => {
    let persistence: PersistenceProvider | undefined = undefined;

    // Enable experimental persistence
    if (token && (canUseDOM || isWebWorker)) {
        if (isElectron) {
            let storage = openWebStorage('graphql', generation);
            persistence = createPersistenceProvider(storage);
        } else {
            let hashedToken = sha256(token).toString();
            let storage = openWebStorage('graphql-' + hashedToken, generation);
            persistence = createPersistenceProvider(storage);
        }
    }

    return new WebEngine(Definitions, {
        endpoint: endpoint,
        connectionParams: { ['x-openland-token']: token },
        protocol: 'openland',
        persistence
    });
};
