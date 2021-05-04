import { LoadableKeyValueStoreCopyable } from './loadable';
import { KeyValueStoreCopyable } from 'openland-y-utils/KeyValueStore';
import * as idb from 'idb';

interface Shema extends idb.DBSchema {
    'store': {
        key: string,
        value: string
    };
}

export class IndexedKeyValueStore implements KeyValueStoreCopyable {

    static open(name: string): KeyValueStoreCopyable {
        return new LoadableKeyValueStoreCopyable((async () => {
            let db = await idb.openDB<Shema>('kv-' + name, 1, {
                upgrade: async (src) => {
                    src.createObjectStore('store');
                }
            });
            return new IndexedKeyValueStore('kv-' + name, db);
        })());
    }

    private db: idb.IDBPDatabase<Shema>;
    private name: string;
    private deleted = false;

    private constructor(name: string, db: idb.IDBPDatabase<Shema>) {
        this.name = name;
        this.db = db;
    }

    async writeKey(key: string, value: string | null): Promise<void> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        let txw = this.db.transaction('store', 'readwrite');
        let store = txw.objectStore('store');
        if (value !== null) {
            store.put(value, key);
        } else {
            store.delete(key);
        }
        await txw.done;
    }

    async writeKeys(items: { key: string, value: string | null }[]): Promise<void> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        let txw = this.db.transaction('store', 'readwrite');
        let store = txw.objectStore('store');
        for (let i of items) {
            if (i.value !== null) {
                store.put(i.value, i.key);
            } else {
                store.delete(i.key);
            }
        }
        await txw.done;
    }

    async readKey(key: string): Promise<string | null> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        let rtx = this.db.transaction('store', 'readonly');
        let store = rtx.objectStore('store');
        let res = await store.get(key);
        if (res === undefined) {
            return null;
        } else {
            return res;
        }
    }

    async readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        let tx = this.db.transaction('store', 'readonly');
        let loaded = await Promise.all(keys.map((k) => tx.objectStore('store').get(k)));
        let res: { key: string, value: string | null }[] = [];
        for (let i = 0; i < keys.length; i++) {
            if (loaded[i] !== undefined) {
                res.push({ key: keys[i], value: loaded[i]! });
            } else {
                res.push({ key: keys[i], value: null });
            }
        }
        return res;
    }

    async readAll(): Promise<{ key: string, value: string }[]> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        let tx = this.db.transaction('store', 'readonly');
        let valuesPromise = tx.objectStore('store').getAll();
        let keysPromise = tx.objectStore('store').getAllKeys();
        let values = await valuesPromise;
        let keys = await keysPromise;
        let res: { key: string, value: string }[] = [];
        for (let i = 0; i < values.length; i++) {
            res.push({ key: keys[i], value: values[i] });
        }
        return res;
    }

    async delete() {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        this.deleted = true;
        this.db.close();
        await idb.deleteDB(this.name);
    }
}