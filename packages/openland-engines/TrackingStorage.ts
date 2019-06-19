import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import { Event } from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';

const log = createLogger('Engine-TrackingStorage');

export type PendingEvent = Event;

export class TrackingStorage {
    private storageKey: string;
    private queue = new ExecutionQueue();

    constructor(name: string) {
        this.storageKey = name;
    }

    async addItem(item: Event) {
        return new Promise<null>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    const items = await AppStorage.readKey<PendingEvent[]>(this.storageKey) || [];

                    items.push(item);

                    await AppStorage.writeKey<PendingEvent[]>(this.storageKey, items);

                    resolve(null);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }

    async getItems() {
        return new Promise<PendingEvent[]>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    const res: PendingEvent[] = await AppStorage.readKey<PendingEvent[]>(this.storageKey) || [];

                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    async removeItems(ids: string[]) {
        return new Promise<null>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    let items = await AppStorage.readKey<PendingEvent[]>(this.storageKey) || [];

                    items = items.filter(item => !ids.includes(item.id));

                    await AppStorage.writeKey<PendingEvent[]>(this.storageKey, items);

                    resolve(null);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}