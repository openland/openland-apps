export interface AppMediaStreamTrack {
    id: string;
    kind: 'video' | 'audio';
    enabled: boolean;
    stop(): void;
}