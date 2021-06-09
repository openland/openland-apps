import { NativeEngine } from './native/NativeEngine';
import { GraphqlEngine, WebEngine } from '@openland/spacex';
import { API_HOST } from 'openland-y-utils/api';

const ENABLE_STORAGE = false;
const ENABLE_NATIVE = true;

export function createEngineNative(storageKey?: string, token?: string): GraphqlEngine {
    let definitions = require('./spacex.descriptor.json');
    if (ENABLE_NATIVE) {
        return new NativeEngine(definitions, ENABLE_STORAGE ? storageKey : undefined, token);
    }
    return new WebEngine({
        definitions,
        endpoint: 'wss://' + API_HOST + '/api',
        connectionParams: { ['x-openland-token']: token },
        protocol: 'openland'
    });
}