import { KeyValueStore } from './KeyValueStore';

export class InMemoryKeyValueStore implements KeyValueStore {
    private _store = new Map<string, string>();
    async writeKey(key: string, value: string | null) {
        if (value) {
            this._store.set(key, value);
        } else {
            this._store.delete(key);
        }
    }
    async writeKeys(items: { key: string, value: string | null }[]) {
        for (let i of items) {
            this.writeKey(i.key, i.value);
        }
    }

    async readKey(key: string) {
        let res = this._store.get(key);
        if (res) {
            return res;
        } else {
            return null;
        }
    }
    async readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]> {
        return keys.map((v) => {
            let res = this._store.get(v);
            if (res) {
                return { key: v, value: res };
            } else {
                return { key: v, value: null };
            }
        })
    }
}