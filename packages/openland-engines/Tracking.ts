import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { EventPlatform } from 'openland-api/Types';

export interface TrackPlatform {
    name: EventPlatform;
    isProd: boolean;
}

interface TrackEvent {
    id: string;
    event: string;
    params?: string;
    time: number;
}

class TrackingEngine {

    private client!: OpenlandClient;
    private initPromise: Promise<void> | undefined;
    private deviceId!: string;
    private pending: TrackEvent[] = [];
    private isSending = false;
    private platform: TrackPlatform = { name: EventPlatform.WEB, isProd: true };

    setClient(client: OpenlandClient) {
        if (!this.client) {
            this.client = client;
            this.flush();
        }
    }

    track(platform: TrackPlatform, event: string, params?: { [key: string]: any }) {
        console.log('Event: ' + event, params, platform);
        this.platform = platform;
        this.pending.push({
            id: uuid(),
            event: event,
            params: params ? JSON.stringify(params) : undefined,
            time: Date.now()
        });

        this.flush();
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