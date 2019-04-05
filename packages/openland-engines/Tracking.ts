import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/OpenlandClient';

export interface TrackPlatform {
    name: 'Web' | 'iOS' | 'Android';
    type: 'development' | 'production';
}

class TrackingEngine {

    private client!: OpenlandClient;
    private initPromise: Promise<void> | undefined;
    private deviceId!: string;
    private pending: { id: string, platform: TrackPlatform, event: string, params?: string }[] = [];
    private isSending = false;

    setClient(client: OpenlandClient) {
        if (!this.client) {
            this.client = client;
            this.flush();
        }
    }

    track(platform: TrackPlatform, event: string, params?: { [key: string]: any }) {
        console.log('Event: ' + event, params, platform);

        this.pending.push({
            platform,
            event,
            params: params ? JSON.stringify(params) : undefined,
            id: uuid()
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
                events: events
            });
        })

        this.isSending = false;
        this.flush();
    }
}

export const Track = new TrackingEngine();