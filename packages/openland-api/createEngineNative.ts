import { NativeEngine } from './native/NativeEngine';
import { GraphqlEngine } from '@openland/spacex';

export function createEngineNative(storageKey?: string, token?: string): GraphqlEngine {
    return new NativeEngine(storageKey, token);
}