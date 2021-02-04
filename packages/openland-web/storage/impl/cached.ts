import { LoadableKeyValueStoreCopyable } from './loadable';
import { KeyValueStoreCopyable } from 'openland-y-utils/KeyValueStore';

export class CachedKeyValueStore implements KeyValueStoreCopyable {

    static open(inner: KeyValueStoreCopyable) {
        return new LoadableKeyValueStoreCopyable((async () => {
            let records = new Map<string, string>();
            for (let record of await inner.readAll()) {
                records.set(record.key, record.value);
            }
            return new CachedKeyValueStore(inner, records);
        })());
    }

    private readonly inner: KeyValueStoreCopyable;
    private readonly values: Map<string, string>;
    private deleted = false;

    private constructor(inner: KeyValueStoreCopyable, initialValues: Map<string, string>) {
        this.inner = inner;
        this.values = initialValues;
    }

    async writeKey(key: string, value: string | null): Promise<void> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        if (value !== null) {
            this.values.set(key, value);
        } else {
            this.values.delete(key);
        }
        this.inner.writeKey(key, value); // NOTE: No need for await
    }
    async writeKeys(items: { key: string, value: string | null }[]): Promise<void> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        for (let i of items) {
            if (i.value !== null) {
                this.values.set(i.key, i.value);
            } else {
                this.values.delete(i.key);
            }
        }
        this.inner.writeKeys(items); // NOTE: No need for await
    }

    async readKey(key: string): Promise<string | null> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        if (this.values.has(key)) {
            return this.values.get(key)!;
        } else {
            return null;
        }
    }

    async readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]> {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        let res: { key: string, value: string | null }[] = [];
        for (let i = 0; i < keys.length; i++) {
            if (this.values.has(keys[i])) {
                res.push({ key: keys[i], value: this.values.get(keys[i])! });
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
        let res: { key: string, value: string }[] = [];
        for (let itm of this.values) {
            res.push({ key: itm[0], value: itm[1] });
        }
        return res;
    }

    async delete() {
        if (this.deleted) {
            throw Error('Already deleted');
        }
        this.deleted = true;
        await this.inner.delete();
    }
}