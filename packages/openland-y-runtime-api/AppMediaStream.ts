export interface AppMediaStreamTrack {
    readonly id: string;
    readonly kind: 'video' | 'audio';
    enabled: boolean;
    readonly muted: boolean;
    setVolume(volume: number): void;

    onmute: (() => void) | null;
    onunmute: (() => void) | null;

    stop(): void;
}