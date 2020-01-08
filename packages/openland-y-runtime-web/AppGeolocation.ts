import { AppGeoilocationApi } from 'openland-y-runtime-api/AppGeolocationApi';

export class AppGeolocationNative implements AppGeoilocationApi {
    async getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined> {
        return await new Promise<{ latitude: number, longitude: number } | undefined>((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, (err) => {
                resolve(undefined);
            });
        });
    }
}

export const AppGeolocation = new AppGeolocationNative();