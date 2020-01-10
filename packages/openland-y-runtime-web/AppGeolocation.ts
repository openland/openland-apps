import { canUseDOM } from './../openland-y-utils/canUseDOM';
import { AppGeoilocationApi } from 'openland-y-runtime-api/AppGeolocationApi';

export class AppGeolocationNative implements AppGeoilocationApi {

    private initPromise: Promise<void>;
    private state: 'initial' | 'allow' | 'deny' | 'unsupported' = undefined as any /* Hack for lazy init */;
    private permissionsWatch: ((state: 'initial' | 'allow' | 'deny' | 'unsupported') => void)[] = [];

    constructor() {
        this.initPromise = this.init();
    }

    private async init() {
        if (canUseDOM) {
            let stateValue = localStorage.getItem('geo-permission-state');
            let state: 'initial' | 'allow' | 'deny';
            if (stateValue !== 'initial' && stateValue !== 'allow' && stateValue !== 'deny') {
                state = 'initial';
                localStorage.setItem('geo-permission-state', 'initial');
            } else {
                state = stateValue;
            }

            if (navigator.permissions) {
                let res = await navigator.permissions.query({ name: 'geolocation' });
                if (res.state === 'granted') {
                    state = 'allow';
                    localStorage.setItem('geo-permission-state', 'allow');
                } else if (res.state === 'denied') {
                    state = 'deny';
                    localStorage.setItem('geo-permission-state', 'deny');
                } else if (res.state === 'prompt') {
                    state = 'initial';
                    localStorage.setItem('geo-permission-state', 'initial');
                }
            }

            this.state = state;
            for (let p of this.permissionsWatch) {
                p(state);
            }
        } else {
            this.state = 'unsupported';
            for (let p of this.permissionsWatch) {
                p('unsupported');
            }
        }
    }

    async getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined> {
        await this.initPromise;
        if (this.state !== 'allow') {
            throw Error('Permission is not requested');
        }
        return await new Promise<{ latitude: number, longitude: number } | undefined>((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            }, (err) => {
                resolve(undefined);
            });
        });
    }

    async permissionState(): Promise<'initial' | 'allow' | 'deny' | 'unsupported'> {
        await this.initPromise;
        return this.state;
    }

    async requestPermissions(): Promise<'allow' | 'deny'> {
        return await new Promise<'allow' | 'deny'>(resolve =>
            navigator.geolocation.getCurrentPosition((position) => {
                this.state = 'allow';
                for (let p of this.permissionsWatch) {
                    p('allow');
                }
                localStorage.setItem('geo-permission-state', 'allow');
                resolve('allow');
            }, (err) => {
                this.state = 'deny';
                for (let p of this.permissionsWatch) {
                    p('deny');
                }
                localStorage.setItem('geo-permission-state', 'deny');
                resolve('deny');
            })
        );
    }

    watchPermissions(callback: (state: 'initial' | 'allow' | 'deny' | 'unsupported') => void): () => void {
        this.permissionsWatch.push(callback);

        return () => {
            let i = this.permissionsWatch.findIndex((v) => v === callback);
            if (i >= 0) {
                this.permissionsWatch.splice(i, 1);
            }
        };
    }
}

export const AppGeolocation = new AppGeolocationNative();