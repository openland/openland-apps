import { AppMediaDeviceManagerApi } from 'openland-y-runtime-api/AppMediaDeviceManagerApi';

export class AppMediaDeviceManagerStub implements AppMediaDeviceManagerApi {
    listenAudioDeviceChange = (listener: (deviceId?: string) => void) => {
        listener();
        return () => { /**/ };
    }
    listenVideoDeviceChange = (listener: (deviceId?: string) => void) => {
        listener();
        return () => { /**/ };
    }
}

export const AppMediaDeviceManager = new AppMediaDeviceManagerStub();