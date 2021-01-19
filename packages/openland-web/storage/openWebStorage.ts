import { delay } from 'openland-y-utils/timer';
import { randomKey } from 'openland-y-utils/randomKey';
import { InMemoryKeyValueStore } from 'openland-y-utils/InMemoryKeyValueStore';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';
import * as idb from 'idb';
import { isUnaryExpression } from '@babel/types';

const ENABLE_CUSTOM_STORAGE: boolean = true;
const LOCK_TIMEOUT = 10000;

interface Shema extends idb.DBSchema {
    'store': {
        key: [string, string],
        value: { ns: string, k: string, v: string }
    };
    'store-meta': {
        key: string,
        value: {
            timeout: number
        }
    };
    'store-latest': {
        key: 'latest',
        value: {
            key: string,
            timeout: number
        }
    };
}

class LoadableKeyValueStore implements KeyValueStore {
    private promise: Promise<KeyValueStore>;
    constructor(promise: Promise<KeyValueStore>) {
        this.promise = promise;
    }

    async writeKey(key: string, value: string | null): Promise<void> {
        await (await this.promise).writeKey(key, value);
    }
    async writeKeys(items: { key: string, value: string | null }[]): Promise<void> {
        await (await this.promise).writeKeys(items);
    }
    async readKey(key: string): Promise<string | null> {
        return await (await this.promise).readKey(key);
    }
    async readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]> {
        return await (await this.promise).readKeys(keys);
    }
}

class IndexedKeyValueStore implements KeyValueStore {
    private db: idb.IDBPDatabase<Shema>;
    private ns: string;
    constructor(ns: string, db: idb.IDBPDatabase<Shema>) {
        this.db = db;
        this.ns = ns;
    }

    async writeKey(key: string, value: string | null): Promise<void> {
        let txw = this.db.transaction('store', 'readwrite');
        if (value !== null) {
            txw.objectStore('store').put({ ns: this.ns, k: key, v: value });
        } else {
            txw.objectStore('store').delete([this.ns, key]);
        }
        await txw.done;
    }

    async writeKeys(items: { key: string, value: string | null }[]): Promise<void> {
        let txw = this.db.transaction('store', 'readwrite');
        for (let i of items) {
            if (i.value !== null) {
                txw.objectStore('store').put({ ns: this.ns, k: i.key, v: i.value });
            } else {
                txw.objectStore('store').delete([this.ns, i.key]);
            }
        }
        await txw.done;
    }

    async readKey(key: string): Promise<string | null> {
        let tx = this.db.transaction('store', 'readonly');
        let res = await tx.objectStore('store').get([this.ns, key]);
        if (res) {
            return res.v;
        } else {
            return null;
        }
    }

    async readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]> {
        let tx = this.db.transaction('store', 'readonly');
        let loaded = await Promise.all(keys.map((k) => tx.objectStore('store').get([this.ns, k])));
        let res: { key: string, value: string | null }[] = [];
        for (let i = 0; i < keys.length; i++) {
            if (loaded[i]) {
                res.push({ key: keys[i], value: loaded[i]!.v });
            } else {
                res.push({ key: keys[i], value: null });
            }
        }
        return res;
    }
}

async function doOpenStore(name: string): Promise<KeyValueStore> {

    //
    // Load IndexedDB
    //

    let db = await idb.openDB<Shema>('storage-' + name, 1, {
        upgrade: async (src) => {
            src.createObjectStore('store', { keyPath: ['ns', 'k'] });
            src.createObjectStore('store-latest');
            src.createObjectStore('store-meta');
        }
    });

    console.log('[storage]: Trying to open store ' + name);

    let storeId: string | null = null;
    while (true) {
        let now = Date.now();

        // Pick latest store
        let latest = await db.transaction(['store-latest'], 'readonly')
            .objectStore('store-latest').get('latest');

        if (latest) {
            if (latest.timeout < now) {
                // Reuse expired store
                storeId = latest.key;
                console.log('[storage]:Found expired latest ' + latest.key + '. Reusing.');
            } else {
                console.log('[storage]:Copy existing latest store from ' + latest.key + '');
                // Copy data from latest
                let rtx = db.transaction(['store', 'store-latest'], 'readonly');
                let [allKeys, latest2] = await Promise.all([
                    rtx.objectStore('store').getAll(IDBKeyRange.bound([latest.key], [latest.key, []])),
                    rtx.objectStore('store-latest').get('latest')
                ]);

                // Retry if missing
                if (!latest2 || latest2.key !== latest.key) {
                    console.log('Latest changed - retrying');
                    continue;
                }

                // Copy all records
                console.log('[storage]: Loaded records', allKeys);
                let key = randomKey();
                let wtx = db.transaction(['store', 'store-latest', 'store-meta'], 'readwrite');
                let timeout = now + LOCK_TIMEOUT;
                wtx.objectStore('store-latest').put({ key, timeout }, 'latest');
                wtx.objectStore('store-meta').put({ timeout }, key);
                if (allKeys) {
                    let os = wtx.objectStore('store');
                    for (let keys of allKeys) {
                        os.put({ ns: key, k: keys.k, v: keys.v });
                    }
                }
                await wtx.done;
                storeId = key;
            }
            break;
        } else {
            let key = randomKey();
            console.log('[storage]: No storage found: start a new one: ' + key);
            let wtx = db.transaction(['store', 'store-latest', 'store-meta'], 'readwrite');
            let timeout = now + LOCK_TIMEOUT;
            wtx.objectStore('store-latest').put({ key, timeout }, 'latest');
            wtx.objectStore('store-meta').put({ timeout }, key);
            await wtx.done;
            storeId = key;
            break;
        }
    }

    if (!storeId) {
        throw Error('Internal error');
    }

    console.log('[storage]: Loaded store ' + storeId);

    // Lock update loop
    (async () => {
        while (true) {
            let wtx = db.transaction(['store-meta', 'store-latest'], 'readwrite');
            let timeout = Date.now() + LOCK_TIMEOUT;
            wtx.objectStore('store-meta').put({ timeout }, storeId);
            wtx.objectStore('store-latest').put({ timeout, key: storeId }, 'latest');
            await wtx.done;
            await delay(1000);
        }
    })();

    return new IndexedKeyValueStore(storeId, db);
}

export function openWebStorage(name: string): KeyValueStore {
    return new LoadableKeyValueStore(doOpenStore(name));
}