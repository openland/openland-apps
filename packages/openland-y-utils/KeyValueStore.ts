export interface KeyValueStore {
    writeKey(key: string, value: string | null): Promise<void>;
    writeKeys(items: { key: string, value: string | null }[]): Promise<void>;
    readKey(key: string): Promise<string | null>;
    readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]>;
}

export interface KeyValueStoreCopyable extends KeyValueStore {
    readAll(): Promise<{ key: string, value: string }[]>;
    delete(): Promise<void>;
}