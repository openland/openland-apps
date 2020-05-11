import { AppAudioTrackAnalyzerApi } from 'openland-y-runtime-api/AppAudioTrackAnalyzerApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';

export class AppAudioTrackAnalyzerNative {
    track: AppMediaStreamTrack;
    constructor(track: AppMediaStreamTrack) {
        this.track = track;
    }

    getVolume() {
        return 0;
    }

    disconnect() {
        //  
    }

}

export const AppAudioTrackAnalyzerFactory: AppAudioTrackAnalyzerApi = {
    createAnalyzer(track: AppMediaStreamTrack, effectiveRange?: [number, number]) {
        return new AppAudioTrackAnalyzerNative(track);
    }
};
