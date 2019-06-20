import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';

interface AppStorageQueuedItem {
    id: string;
}

export class AppStorageQueued<T extends AppStorageQueuedItem> {
    private storageKey: string;
    private queue = new ExecutionQueue();

    constructor(name: string) {
        this.storageKey = name;
    }

    async addItem(item: T) {
        return new Promise<null>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    const items = await AppStorage.readKey<T[]>(this.storageKey) || [];

                    items.push(item);

                    await AppStorage.writeKey<T[]>(this.storageKey, items);

                    resolve(null);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }

    async getItems() {
        return new Promise<T[]>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    const res: T[] = await AppStorage.readKey<T[]>(this.storageKey) || [];

                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    async getItemsBatch(batchSize: number) {
        return new Promise<T[]>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    const res: T[] = await AppStorage.readKey<T[]>(this.storageKey) || [];

                    resolve(res.slice(0, batchSize));
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    async removeItems(keys: string[]) {
        return new Promise<null>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    let items = await AppStorage.readKey<T[]>(this.storageKey) || [];

                    items = items.filter(item => !keys.includes(item.id));

                    await AppStorage.writeKey<T[]>(this.storageKey, items);

                    resolve(null);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}