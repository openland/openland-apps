import { AppGeoilocationApi } from 'openland-y-runtime-api/AppGeolocationApi';

export class AppGeolocationStub implements AppGeoilocationApi {
    async getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined> {
        return undefined;
    }
}

export const AppGeolocation = new AppGeolocationStub();