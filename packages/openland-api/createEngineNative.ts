import { Definitions } from './spacex.web';
// import { NativeEngine } from './native/NativeEngine';
import { GraphqlEngine, WebEngine } from '@openland/spacex';
import { API_HOST } from 'openland-y-utils/api';

export function createEngineNative(storageKey?: string, token?: string): GraphqlEngine {
    // return new NativeEngine(storageKey, token);
    return new WebEngine(Definitions, {
        endpoint: 'wss://' + API_HOST + '/api',
        connectionParams: { ['x-openland-token']: token },
        protocol: 'openland'
    });
}