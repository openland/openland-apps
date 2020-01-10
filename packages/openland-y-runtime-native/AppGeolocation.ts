import { AppGeoilocationApi } from 'openland-y-runtime-api/AppGeolocationApi';
import Geolocation from 'react-native-location';
import { AsyncStorage } from 'react-native';

Geolocation.configure({ /* ? */ });

export class AppGeolocationNative implements AppGeoilocationApi {

    private initPromise: Promise<void>;
    private state: 'initial' | 'allow' | 'deny' = undefined as any /* Hack for lazy init */;

    constructor() {
        this.initPromise = this.init();
    }

    private async init() {
        let stateValue = await AsyncStorage.getItem('geo-permission-state');
        let state: 'initial' | 'allow' | 'deny';
        if (stateValue !== 'initial' && stateValue !== 'allow' && stateValue !== 'deny') {
            state = 'initial';
            await AsyncStorage.setItem('geo-permission-state', 'initial');
        } else {
            state = stateValue;
        }

        let current = await Geolocation.getCurrentPermission();
        if (current === 'notDetermined') {
            state = 'initial';
        } else if (current === 'authorizedAlways' || current === 'authorizedCoarse' || current === 'authorizedFine' || current === 'authorizedWhenInUse') {
            state = 'allow';
        } else if (current === 'denied') {
            state = 'deny';
        } else if (current === 'restricted') {
            state = 'deny';
        }

        this.state = state;
    }

    async getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined> {
        await this.initPromise;
        let r = await Geolocation.getLatestLocation({});
        if (r) {
            return { latitude: r.latitude, longitude: r.longitude };
        } else {
            return undefined;
        }
    }

    async permissionState(): Promise<'initial' | 'allow' | 'deny' | 'unsupported'> {
        await this.initPromise;
        return this.state;
    }

    async requestPermissions(): Promise<'allow' | 'deny'> {
        let res = await Geolocation.requestPermission({ ios: 'whenInUse' });
        if (res) {
            this.state = 'allow';
            await AsyncStorage.setItem('geo-permission-state', 'allow');
            return 'allow';
        } else {
            this.state = 'deny';
            await AsyncStorage.setItem('geo-permission-state', 'deny');
            return 'deny';
        }
    }
}

export const AppGeolocation = new AppGeolocationNative();