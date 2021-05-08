import { Definitions } from './spacex.web';
import { NativeEngine } from './native/NativeEngine';
import { GraphqlEngine, WebEngine } from '@openland/spacex';
import { API_HOST } from 'openland-y-utils/api';

const ENABLE_STORAGE = false;
const ENABLE_NATIVE = true;

export function createEngineNative(storageKey?: string, token?: string): GraphqlEngine {
    if (ENABLE_NATIVE) {
        return new NativeEngine(ENABLE_STORAGE ? storageKey : undefined, token);
    }
    return new WebEngine(Definitions, {
        endpoint: 'wss://' + API_HOST + '/api',
        connectionParams: { ['x-openland-token']: token },
        protocol: 'openland'
    });
}