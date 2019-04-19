import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { EventPlatform, Event } from 'openland-api/Types';

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
        this.pending.push(item);

        this.flush();

        console.log('Event: ', item);
    }

    private async flush() {
        if (!this.client) {
            return;
        }
        if (this.isSending) {
            return;
        }
        if (this.pending.length === 0) {
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

                console.log('DEVICE-ID: ' + did);
            })();
        }

        await this.initPromise;

        let events = [...this.pending];
        this.pending = [];
        await backoff(async () => {
            await this.client.mutatePersistEvents({
                did: this.deviceId,
                events: events,
                platform: this.platform.name,
                isProd: this.platform.isProd
            });
        })

        this.isSending = false;
        this.flush();
    }
}

export const Track = new TrackingEngine();