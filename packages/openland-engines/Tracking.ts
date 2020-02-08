import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/spacex';
import { EventPlatform, Event } from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { AppStorageQueued } from 'openland-y-utils/AppStorageQueued';

const TRACKING_STORAGE_VERSION = 4;
const BATCH_SIZE = 100;

const log = createLogger('Engine-Tracking');

export interface TrackPlatform {
    name: EventPlatform;
    os: string;
    isProd: boolean;
}

class TrackingEngine {
    private client!: OpenlandClient;
    private initPromise: Promise<void> | undefined;
    private deviceId!: string;
    private pending: Event[] = [];
    private isSending = false;
    private isProd: boolean = true;
    private storage: AppStorageQueued<Event>;

    constructor() {
        this.storage = new AppStorageQueued('tracking-pending-' + TRACKING_STORAGE_VERSION);
    }

    async setClient(client: OpenlandClient) {
        if (!this.client) {
            this.client = client;

            const fromStorage = await this.storage.getItems();

            log.log('Found in storage. Count: ' + fromStorage.length);

            this.pending = [...fromStorage, ...this.pending];
            this.processEvents();
        }
    }

    async track(platform: TrackPlatform, event: string, params?: { [key: string]: any }) {
        let item: Event = {
            id: uuid(),
            event: event,
            params: params ? JSON.stringify(params) : undefined,
            time: Date.now().toString(),
            platform: platform.name,
            os: platform.os
        };

        log.log('New event: ' + JSON.stringify(item));

        this.isProd = platform.isProd;
        this.pending.push(item);

        await this.storage.addItem(item);

        this.processEvents();
    }

    private async processEvents() {
        if (!this.client || this.isSending || this.pending.length <= 0) {
            return;
        }

        this.isSending = true;

        if (!this.initPromise) {
            this.initPromise = (async () => {
                let did = await AppStorage.readKey<string>('device-id');
                if (!did) {
                    did = uuid();
                    await AppStorage.writeKey<string>('device-id', did);
                }
                this.deviceId = did;

                log.log('DEVICE-ID: ' + did);
            })();
        }

        await this.initPromise;
        
        while (this.pending.length > 0) {
            const batch = this.pending.splice(0, BATCH_SIZE);

            await backoff(async () => {
                await this.client.mutatePersistEvents({
                    did: this.deviceId,
                    events: batch,
                    isProd: this.isProd
                });
    
                log.log('Send events. Count: ' + batch.length);
            });

            await this.storage.removeItems(batch.map(p => p.id));
        }

        this.isSending = false;
    }
}

export const Track = new TrackingEngine();