import { AppGeoilocationApi } from 'openland-y-runtime-api/AppGeolocationApi';

export class AppGeolocationStub implements AppGeoilocationApi {
    async getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined> {
        return undefined;
    }
    async permissionState(): Promise<'initial' | 'allow' | 'deny' | 'unsupported'> {
        return 'unsupported';
    }
    async requestPermissions(): Promise<'allow' | 'deny'> {
        return 'deny';
    }

    watchPermissions(callback: (state: 'initial' | 'allow' | 'deny' | 'unsupported') => void): () => void {
        throw Error('Stub');
    }
}

export const AppGeolocation = new AppGeolocationStub();