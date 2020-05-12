import { AppMediaStreamTrack } from './AppMediaStream';

export interface AppAudioTrackAnalyzer {
    track: AppMediaStreamTrack;
    getVolume(): number;
    disconnect(): void;
}

export interface AppAudioTrackAnalyzerApi {
    createAnalyzer(track: AppMediaStreamTrack, effectiveRange?: [number, number]): AppAudioTrackAnalyzer;
}