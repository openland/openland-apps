import { createClient } from './createClient';
import { createEngineNative } from './createEngineNative';

export function createClientNative(storageKey?: string, token?: string) {
    return createClient(createEngineNative(storageKey, token));
}