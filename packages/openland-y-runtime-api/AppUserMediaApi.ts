export interface AppMediaStream {
    id: string;
    muted: boolean;
    close(): void;
    onClosed: (() => void) | undefined;
}

export interface AppUserMediaApi {
    getUserAudio(): Promise<AppMediaStream>;
    getUserScreen(): Promise<AppMediaStream>;
}