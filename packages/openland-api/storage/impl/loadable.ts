import { KeyValueStore, KeyValueStoreCopyable } from 'openland-y-utils/KeyValueStore';

export class LoadableKeyValueStore implements KeyValueStore {
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

export class LoadableKeyValueStoreCopyable implements KeyValueStoreCopyable {
    private promise: Promise<KeyValueStoreCopyable>;
    constructor(promise: Promise<KeyValueStoreCopyable>) {
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

    async readAll(): Promise<{ key: string, value: string }[]> {
        return await (await this.promise).readAll();
    }
    
    async delete() {
        return await (await this.promise).delete();
    }
}