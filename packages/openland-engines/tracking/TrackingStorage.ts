import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import { Event } from 'openland-api/Types';
import { createLogger } from 'mental-log';

const TRACKING_STORAGE_VERSION = 2;
const log = createLogger('Engine-TrackingStorage');

export type PendingEvent = Event;

export class TrackingStorage {
    private storageKey = 'tracking-pending-' + TRACKING_STORAGE_VERSION + '-';

    private async addIndex(id: string) {
        const indexes = await this.getIndexes();

        indexes.push(id);

        await this.setIndexes(indexes);
    }

    private async removeIndex(id: string) {
        let indexes = await this.getIndexes();

        indexes = indexes.filter(index => index !== id);

        await this.setIndexes(indexes);
    }

    private async removeIndexes(ids: string[]) {
        let indexes = await this.getIndexes();

        indexes = indexes.filter(index => !ids.includes(index));

        await this.setIndexes(indexes);
    }

    private async getIndexes(): Promise<string[]> {
        const indexes = await AppStorage.readKey<string[]>(this.storageKey + 'indexes');

        return indexes || [];
    }

    private async setIndexes(ids: string[]) {
        await AppStorage.writeKey<string[]>(this.storageKey + 'indexes', ids);
    }

    private async clearIndexes() {
        await AppStorage.writeKey(this.storageKey + 'indexes', null);
    }

    async addItem(item: Event) {
        log.log('add item: ' + JSON.stringify(item));

        await this.addIndex(item.id);
        await AppStorage.writeKey<PendingEvent>(this.storageKey + item.id, item);
    }

    async getItems(): Promise<PendingEvent[]> {
        const indexes = await this.getIndexes();
        const res: PendingEvent[] = [];

        for (let id of indexes) {
            const item = await AppStorage.readKey<PendingEvent>(this.storageKey + id);

            if (item) {
                res.push(item);
            }
        }

        return res;
    }

    async removeItem(id: string) {
        await this.removeIndex(id);
        await AppStorage.writeKey(this.storageKey + id, null);
    }

    async removeItems(ids: string[]) {
        await this.removeIndexes(ids);

        for (let id of ids) {
            await AppStorage.writeKey(this.storageKey + id, null);
        }
    }

    async clear() {
        const indexes = await this.getIndexes();

        for (let id of indexes) {
            await AppStorage.writeKey(this.storageKey + id, null);
        }

        await this.clearIndexes();
    }
}