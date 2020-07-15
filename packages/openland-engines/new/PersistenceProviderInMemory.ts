import { PersistenceProvider } from './PersistenceProvider';

export class PersistenceProviderInMemory implements PersistenceProvider {
    private data = new Map<string, string>();
    readKeys = async (keys: string[]): Promise<(string | null)[]> => {
        return keys.map((v) => this.data.get(v) || null);
    }
    writeKeys = async (keys: { key: string, value: string | null }[]): Promise<void> => {
        for (let k of keys) {
            if (k.value !== null) {
                this.data.set(k.key, k.value);
            } else {
                this.data.delete(k.key);
            }
        }
    }
}