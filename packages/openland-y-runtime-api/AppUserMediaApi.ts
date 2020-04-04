export interface AppMediaStream {
    id: string;
    muted: boolean;
    blinded: boolean;
    close(): void;
    onClosed: (() => void) | undefined;
    hasAudio(): boolean;
    hasVideo(): boolean;
}

export interface AppUserMediaApi {
    getUserAudio(deviceId?: string): Promise<AppMediaStream>;
    getUserVideo(): Promise<AppMediaStream>;
    getUserScreen(): Promise<AppMediaStream>;
}