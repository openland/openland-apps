import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';

class TrackingEngine {

    private initPromise: Promise<void> | undefined;
    private deviceId!: string;

    track(event: string, params?: { [key: string]: any }) {
        this.doTrack(event, params);
    }

    private async doTrack(event: string, params?: { [key: string]: any }) {
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

        console.log('Event: ' + event, params);

        // TODO: Implement reporting
    }
}

export const Track = new TrackingEngine();