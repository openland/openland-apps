import { randomKey } from 'openland-y-utils/randomKey';
import { LoadableKeyValueStoreCopyable } from './loadable';
import { KeyValueStoreCopyable } from 'openland-y-utils/KeyValueStore';
import { delay } from 'openland-y-utils/timer';

const LOCK_TIMEOUT = 10000;

class IndexStorage {
    private readonly store: KeyValueStoreCopyable;

    constructor(store: KeyValueStoreCopyable) {
        this.store = store;
    }

    /**
     * Allocate new store
     */
    async allocateNew(baseName: string, seed: string) {
        let id = randomKey();
        let now = Date.now();
        await this.store.writeKeys([
            { key: 'stores.' + baseName, value: '' },
            { key: 'locks.' + baseName + '.' + id, value: JSON.stringify({ seed: seed, timeout: now + LOCK_TIMEOUT }) }
        ]);
        return id;
    }

    async deleteReference(baseName: string, id: string) {
        await this.store.writeKeys([
            { key: 'locks.' + baseName + '.' + id, value: null }
        ]);
    }

    /**
     * Try to lock existing store
     */
    async tryLock(baseName: string, id: string, seed: string) {
        let lockKey = 'locks.' + baseName + '.' + id;

        while (true) {

            // Check existing lock
            let now = Date.now();
            let lockRaw = await this.store.readKey(lockKey);
            if (lockRaw) {
                let lock = JSON.parse(lockRaw) as { seed: string, timeout: number };
                if (lock.seed !== seed && now < lock.timeout) {
                    return false;
                } else {
                    return true;
                }
            }

            // Update lock
            await this.store.writeKey(lockKey, JSON.stringify({ seed: seed, timeout: now + LOCK_TIMEOUT }));
        }
    }

    /**
     * Refresh lock and latest reference
     */
    async refreshLockAndLatest(baseName: string, id: string, seed: string) {
        let now = Date.now();
        await this.store.writeKeys([
            { key: 'locks.' + baseName + '.' + id, value: JSON.stringify({ seed: seed, timeout: now + LOCK_TIMEOUT }) },
            { key: 'latest.' + baseName, value: JSON.stringify({ id, timeout: now + LOCK_TIMEOUT }) }
        ]);
    }

    /**
     * Get all stores
     */
    async getAllStores() {
        let now = Date.now();
        let all = await this.store.readAll();
        let stores = new Set<string>();
        let latests = new Map<string, string>();
        let storeIds = new Map<string, { id: string, expired: boolean }[]>();

        // Read stores
        for (let item of all) {
            if (item.key.startsWith('stores.')) {
                let name = item.key.substring('stores.'.length);
                stores.add(name);
                storeIds.set(name, []);
            }
        }

        // Read latests
        for (let item of all) {
            if (item.key.startsWith('latest.')) {
                let name = item.key.substring('latest.'.length);
                if (!stores.has(name)) {
                    continue;
                }
                let latest = JSON.parse(item.value) as { id: string, timeout: number };
                latests.set(name, latest.id);
            }
        }

        // Read store ids
        for (let item of all) {
            if (item.key.startsWith('locks.')) {
                let parts = item.key.substring('locks.'.length).split('.');
                let name = parts[0];
                let id = parts[1];
                let lock = JSON.parse(item.value) as { seed: string, timeout: number };
                if (!stores.has(name)) {
                    continue;
                }
                storeIds.get(name)!.push({ id, expired: lock.timeout < now });
            }
        }

        let res: { name: string, refs: { id: string, expired: boolean }[] }[] = [];
        for (let name of stores.values()) {
            let refs = storeIds.get(name)!;
            let latest = latests.get(name);
            res.push({ name, refs: refs.map((v) => ({ id: v.id, expired: v.id === latest ? false : v.expired })) });
        }

        return res;
    }

    /**
     * Find latest
     */
    async findLatest(baseName: string) {
        let ex = await this.store.readKey('latest.' + baseName);
        if (!ex) {
            return null;
        }
        let latest = JSON.parse(ex) as { id: string, timeout: number };
        return latest.id;
    }
}

export function openConcurrent(baseName: string, factory: (name: string) => KeyValueStoreCopyable): KeyValueStoreCopyable {
    if (baseName.indexOf('.') >= 0) {
        throw Error('Base name couldn\'t contain dots');
    }

    return new LoadableKeyValueStoreCopyable((async () => {
        let index = new IndexStorage(factory('concurrent-index'));
        let seed = randomKey();

        // Garbadge collect old stores
        for (let existingStore of await index.getAllStores()) {
            for (let ref of existingStore.refs) {
                if (ref.expired) {
                    console.log('[storage]: Remove store ' + existingStore.name + '/' + ref.id);
                    await factory(baseName + '-' + ref.id).delete();
                    await index.deleteReference(existingStore.name, ref.id);
                }
            }
        }

        // Try to open storage
        let storeId: string;
        let store: KeyValueStoreCopyable;
        while (true) {
            let latest = await index.findLatest(baseName);
            if (latest) {
                console.log('[storage]: Found latest for ' + baseName + ': ' + latest);
                if (await index.tryLock(baseName, latest, seed)) {
                    console.log('[storage]: Using ' + baseName + '/' + latest);
                    // Locked latest - use it directly
                    storeId = latest;
                    store = factory(baseName + '-' + storeId);
                    break;
                } else {
                    // Copy all data from latest
                    let base = factory(baseName + '-' + latest);
                    let existing = await base.readAll();
                    storeId = await index.allocateNew(baseName, seed);
                    store = factory(baseName + '-' + storeId);
                    await store.writeKeys(existing);
                    console.log('[storage]: Copy from ' + baseName + '/' + latest + ' to ' + baseName + '/' + storeId);
                    break;
                }
            }

            // Create new
            storeId = await index.allocateNew(baseName, seed);
            store = factory(baseName + '-' + storeId);
            console.log('[storage]: Allocate new ' + baseName + '/' + storeId);
            break;
        }

        // Refresh lock
        (async () => {
            while (true) {
                await index.refreshLockAndLatest(baseName, storeId, seed);
                await delay(1000);
            }
        })();

        return store;
    })());
}