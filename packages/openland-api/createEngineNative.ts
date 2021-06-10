import { NativeEngine } from './native/NativeEngine';
import { GraphqlEngine } from '@openland/spacex';

const ENABLE_STORAGE = false;

export function createEngineNative(storageKey?: string, token?: string): GraphqlEngine {
    let definitions = require('./spacex.descriptor.json');
    return new NativeEngine(definitions, ENABLE_STORAGE ? storageKey : undefined, token);
}