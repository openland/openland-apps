export interface AppMediaStream {
    muted: boolean;
    close(): void;
}

export interface AppUserMediaApi {
    getUserAudio(): Promise<AppMediaStream>;
}