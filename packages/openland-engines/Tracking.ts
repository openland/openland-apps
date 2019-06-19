import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { EventPlatform, Event } from 'openland-api/Types';
import { createLogger } from 'mental-log';

const PENDING_STORAGE_VERSION = 1;
const log = createLogger('Engine-Tracking');

export interface TrackPlatform {
    name: EventPlatform;
    isProd: boolean;
}

type PendingEvent = Event;

class TrackingEngine {
    private client!: OpenlandClient;
    private initPromise: Promise<void> | undefined;
    private deviceId!: string;
    private isSending = false;
    private platform: TrackPlatform = { name: EventPlatform.WEB, isProd: true };
    private storageKey = 'tracking-pending' + PENDING_STORAGE_VERSION;

    setClient(client: OpenlandClient) {
        if (!this.client) {
            this.client = client;
            this.flush();
        }
    }

    track(platform: TrackPlatform, event: string, params?: { [key: string]: any }) {
        let item: Event = {
            id: uuid(),
            event: event,
            params: params ? JSON.stringify(params) : undefined,
            time: Date.now().toString()
        };

        this.platform = platform;

        this.addPending(item);
        this.flush();
    }

    private async flush() {
        if (!this.client || this.isSending) {
            return;
        }

        const pending = await this.getPending();

        if (pending.length <= 0) {
            return;
        }
        log.log('Flush');

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

        await backoff(async () => {
            await this.client.mutatePersistEvents({
                did: this.deviceId,
                events: pending,
                platform: this.platform.name,
                isProd: this.platform.isProd
            });
        })

        this.clearPending();

        this.isSending = false;
        this.flush();
    }

    private async addPending(event: Event) {
        log.log('New pending event: ' + JSON.stringify(event));

        let pending = await this.getPending();

        pending.push(event);

        await AppStorage.writeKey<PendingEvent[]>(this.storageKey, pending);
    }

    private async getPending(): Promise<PendingEvent[]> {
        const pending = await AppStorage.readKey<PendingEvent[]>(this.storageKey);

        return pending || [];
    }

    private async clearPending() {
        log.log('Clear pending events');

        await AppStorage.writeKey(this.storageKey, null);
    }
}

export const Track = new TrackingEngine();