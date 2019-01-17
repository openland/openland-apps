export interface AppStorageApi {
    readKey<T>(key: string): Promise<T | undefined | null>;
    writeKey<T>(key: string, value: T | null | undefined): Promise<void>;
}