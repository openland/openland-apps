export interface KeyValueStore {
    writeKey(key: string, value: string | null): Promise<void>
    readKey(key: string): Promise<string | null>
}