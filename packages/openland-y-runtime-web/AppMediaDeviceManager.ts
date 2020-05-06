import { AppMediaDeviceManagerApi } from 'openland-y-runtime-api/AppMediaDeviceManagerApi';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

export class AppMediaDeviceManagerStub implements AppMediaDeviceManagerApi {
    listenAudioDeviceChange = (listener: (deviceId?: string) => void) => {
        return MediaDevicesManager.instance().listenAudioInputDevice(d => {
            listener(d?.deviceId);
        });
    }
    listenVideoDeviceChange = (listener: (deviceId?: string) => void) => {
        return MediaDevicesManager.instance().listenVideoInputDevice(d => {
            listener(d?.deviceId);
        });
    }

}

export const AppMediaDeviceManager = new AppMediaDeviceManagerStub();