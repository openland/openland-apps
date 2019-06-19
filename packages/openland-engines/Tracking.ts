import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { EventPlatform, Event } from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { TrackingStorage } from './TrackingStorage';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';

const TRACKING_STORAGE_VERSION = 3;
const log = createLogger('Engine-Tracking');

export interface TrackPlatform {
    name: EventPlatform;
    isProd: boolean;
}

class TrackingEngine {
    private queue = new ExecutionQueue();
    private client!: OpenlandClient;
    private deviceId!: string;
    private platform: TrackPlatform = { name: EventPlatform.WEB, isProd: true };
    private storage: TrackingStorage;

    constructor() {
        this.storage = new TrackingStorage('tracking-pending-' + TRACKING_STORAGE_VERSION);
        this.queue.post(async () => {
            let did = await AppStorage.readKey<string>('device-id');
            if (!did) {
                did = uuid();
                await AppStorage.writeKey<string>('device-id', did);
            }
            this.deviceId = did;

            log.log('DEVICE-ID: ' + did);
        });
    }

    setClient(client: OpenlandClient) {
        if (!this.client) {
            this.client = client;
            this.queue.post(async () => {
                await this.flush();
            });
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

        await this.storage.addItem(item);

        this.queue.post(async () => {
            await this.flush();
        });
    }

    private async flush() {
        if (!this.client) {
            return;
        }

        const pending = await this.storage.getItems();

        if (pending.length <= 0) {
            return;
        }

        await backoff(async () => {
            await this.client.mutatePersistEvents({
                did: this.deviceId,
                events: pending,
                platform: this.platform.name,
                isProd: this.platform.isProd
            });

            log.log('Flush: send ' + pending.length + ' events');
        });

        await this.storage.removeItems(pending.map(p => p.id));

        this.queue.post(async () => {
            await this.flush();
        });
    }
}

export const Track = new TrackingEngine();