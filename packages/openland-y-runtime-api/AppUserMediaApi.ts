export interface AppMediaStreamTrack {
    id: string;
    kind: 'video' | 'audio';
    enabled: boolean;
    stop(): void;
}

export interface AppUserMediaApi {
    getUserAudio(deviceId?: string): Promise<AppMediaStreamTrack>;
    getUserVideo(deviceId?: string): Promise<AppMediaStreamTrack>;
    getUserScreen(): Promise<AppMediaStreamTrack>;
}