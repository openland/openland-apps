import { AppMediaStreamTrack } from './AppMediaStream';

export interface AppUserMediaApi {
    getUserAudio(deviceId?: string): Promise<AppMediaStreamTrack>;
    getUserVideo(deviceId?: string): Promise<AppMediaStreamTrack>;
    getUserScreen(): Promise<AppMediaStreamTrack>;
}