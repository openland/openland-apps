export interface PersistenceProvider {
    readKeys(keys: string[]): Promise<(string | null)[]>;
    writeKeys(keys: { key: string, value: string | null }[]): Promise<void>;
}