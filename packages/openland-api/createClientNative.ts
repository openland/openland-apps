import { NativeEngine } from './native/NativeEngine';
import { createClient } from './createClient';

export function createClientNative(storageKey?: string, token?: string) {
    return createClient(new NativeEngine(storageKey, token));
}