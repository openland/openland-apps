import { AppGeoilocationApi } from 'openland-y-runtime-api/AppGeolocationApi';
import Geolocation from '@react-native-community/geolocation';

export class AppGeolocationNative implements AppGeoilocationApi {
    async getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined> {
        return await new Promise<{ latitude: number, longitude: number } | undefined>((resolve) => {
            Geolocation.getCurrentPosition((position) => {
                resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, () => {
                resolve(undefined);
            });
        });
    }
}

export const AppGeolocation = new AppGeolocationNative();