import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { EventPlatform, Event } from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';
import { AppStorageQueued } from 'openland-y-utils/AppStorageQueued';

const TRACKING_STORAGE_VERSION = 3;
const BATCH_SIZE = 100;

const log = createLogger('Engine-Tracking');

export interface TrackPlatform {
    name: EventPlatform;
    isProd: boolean;
}

class TrackingEngine {
    private client!: OpenlandClient;
    private initPromise: Promise<void> | undefined;
    private deviceId!: string;
    private pending: Event[] = [];
    private isSending = false;
    private platform: TrackPlatform = { name: EventPlatform.WEB, isProd: true };
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
            time: Date.now().toString()
        };

        log.log('New event: ' + JSON.stringify(item));

        this.platform = platform;
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
            const batch = this.pending.slice(0, BATCH_SIZE);

            await backoff(async () => {
                await this.client.mutatePersistEvents({
                    did: this.deviceId,
                    events: batch,
                    platform: this.platform.name,
                    isProd: this.platform.isProd
                });
    
                log.log('Send events. Count: ' + batch.length);
            });

            const ids = batch.map(p => p.id);
    
            this.pending.splice(0, BATCH_SIZE);

            await this.storage.removeItems(ids);
        }

        this.isSending = false;
    }
}

export const Track = new TrackingEngine();