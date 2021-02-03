import { Transaction } from 'openland-engines/persistence/Persistence';

export class StoredMap<T> {
    private namespace: string;
    private cache = new Map<string, T | null>();

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    async get(tx: Transaction, key: string): Promise<T | null> {
        let cached = this.cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        let res = await tx.readJson<T>(this.namespace + '.' + key);
        cached = this.cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        this.cache.set(key, res);
        return res;
    }

    async getOrFail(tx: Transaction, key: string): Promise<T> {
        let res = await this.get(tx, key);
        if (!res) {
            throw Error('Unable to find value for ' + this.namespace + '.' + key);
        }
        return res;
    }

    getSync(key: string): T | null {
        let cached = this.cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        throw Error('Value is not in cache');
    }

    getSyncOrFail(key: string): T {
        let res = this.getSync(key);
        if (!res) {
            throw Error('Unable to find value for ' + this.namespace + '.' + key);
        }
        return res;
    }

    set(tx: Transaction, key: string, value: T) {
        tx.writeJson(this.namespace + '.' + key, value);
        this.cache.set(key, value);
    }

    delete(tx: Transaction, key: string) {
        tx.clear(this.namespace + '.' + key);
        this.cache.set(key, null);
    }
}