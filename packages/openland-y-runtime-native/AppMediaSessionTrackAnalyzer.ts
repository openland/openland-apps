import { AppMediaSessionTrackAnalyzerApi, AppMediaSessionTrackAnalyzer } from "openland-y-runtime-api/AppMediaSessionTrackAnalyzerApi";
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';

class AppMediaSessionTrackAnalyzerNative implements AppMediaSessionTrackAnalyzer {
    setSessionState(state: MediaSessionState) {
        //
    }
    listenPeersVolume(listener: (peersVolume: { [id: string]: number; }) => void) {
        return () => { /* */ };
    }
    dispose() {
        //
    }

}

export const AppMediaSessionTrackAnalyzerFactory: AppMediaSessionTrackAnalyzerApi = {
    createAnalyzer() {
        return new AppMediaSessionTrackAnalyzerNative();
    }
};
