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
    async readKey(key: string) {
        let res = this._store.get(key);
        if (res) {
            return res;
        } else {
            return null;
        }
    }
}