export interface AppMediaDeviceManagerApi {
    listenAudioDeviceChange: (listener: (deviceId?: string) => void) => () => void;
    listenVideoDeviceChange: (listener: (deviceId?: string) => void) => () => void;
}
