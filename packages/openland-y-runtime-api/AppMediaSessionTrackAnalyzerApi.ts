import { MediaSessionState } from 'openland-engines/media/MediaSessionState';

export interface AppMediaSessionTrackAnalyzer {
    setSessionState(state: MediaSessionState): void;
    listenPeersVolume(listener: (peersVolume: { [id: string]: number }) => void): () => void;
    dispose(): void;
}

export interface AppMediaSessionTrackAnalyzerApi {
    createAnalyzer(): AppMediaSessionTrackAnalyzer;
}