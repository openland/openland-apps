import { CachedKeyValueStore } from './impl/cached';
import { IndexedKeyValueStore } from './impl/indexed';
import { PersistenceVersion } from 'openland-engines/PersitenceVersion';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';
import { openConcurrent } from './impl/concurrent';

export function openWebStorage(name: string, generation: number): KeyValueStore {
    return openConcurrent(name + '-' + PersistenceVersion + '-' + generation, (innerName) => {
        let indexed = IndexedKeyValueStore.open(innerName);
        return CachedKeyValueStore.open(indexed);
    });
}