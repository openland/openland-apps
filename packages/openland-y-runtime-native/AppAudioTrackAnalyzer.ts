import { AppAudioTrackAnalyzerApi } from 'openland-y-runtime-api/AppAudioTrackAnalyzerApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { NativeModules } from 'react-native';
import { getMessenger } from '../openland-mobile/utils/messenger';

const {WebRTCModule} = NativeModules;

class NativeTrackVolumesManager {
    #volumes = new Map<string, number>();
    #initiated = false;
    #loop: any;

    #init = () => {
        if (getMessenger().engine.calls.currentMediaSession) {
            this.#start();
        }
        getMessenger().engine.calls.onCurrentSessionChange(session => {
            session ? this.#start() : this.#stop();
        });
        this.#initiated = true;
    }

    #start = () => {
        clearInterval(this.#loop);
        this.#loop = setInterval(() => this.#updateValues(), 100);
    }

    #stop = () => {
        clearInterval(this.#loop);
        this.#volumes.clear();
    }

    #updateValues = () => {
        WebRTCModule.getTrackVolumes((res: [[string, string]]) => {
            for (let [trackId, volumeLevel] of res) {
                this.#volumes.set(trackId, parseInt(volumeLevel, 10));
            }
        });
    }

    getVolume(trackId: string) {
        if (!this.#initiated) {
            this.#init();
        }
        return this.#volumes.get(trackId) || 0;
    }
}

const volumeManager = new NativeTrackVolumesManager();

export class AppAudioTrackAnalyzerNative {
    track: AppMediaStreamTrack;

    constructor(track: AppMediaStreamTrack) {
        this.track = track;
    }

    getVolume() {
        let vol = volumeManager.getVolume(this.track.id);
        if (vol > 500) {
            return 1;
        }
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
