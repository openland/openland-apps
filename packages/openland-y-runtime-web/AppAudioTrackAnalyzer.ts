import { AppAudioTrackAnalyzerApi } from 'openland-y-runtime-api/AppAudioTrackAnalyzerApi';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMediaTrackWeb } from './AppUserMedia';

const _AudioContext = canUseDOM && (window.AudioContext // Default
    || (window as any).webkitAudioContext);
let audioContext: AudioContext | undefined;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = _AudioContext ? new _AudioContext() : undefined;
    }
    return audioContext;
};

export class AppAudioTrackAnalyzerWeb {
    track: AppUserMediaTrackWeb;
    effectiveRange?: [number, number];
    stream: MediaStream;
    buffer?: Uint8Array;
    analyzer?: AnalyserNode;
    fStartIndex = 0;
    fEndIndex = 1023;
    constructor(track: AppUserMediaTrackWeb, effectiveRange?: [number, number]) {
        this.track = track;
        this.effectiveRange = effectiveRange;
        audioContext = getAudioContext();
        this.stream = new MediaStream();
        this.stream.addTrack(track.track);

        if (!audioContext) {
            return;
        }

        this.analyzer = audioContext.createAnalyser();

        const bufferLength = this.analyzer.frequencyBinCount;
        this.buffer = new Uint8Array(bufferLength);

        if (effectiveRange) {
            let fstep = audioContext.sampleRate / 2 / this.analyzer.frequencyBinCount;
            this.fStartIndex = Math.floor(effectiveRange[0] / fstep);
            this.fEndIndex = Math.ceil(effectiveRange[1] / fstep + 1);
        }

        let source = (audioContext as AudioContext).createMediaStreamSource(this.stream);
        source.connect(this.analyzer);
    }

    getVolume() {
        if (!this.analyzer || !this.buffer) {
            return 0;
        }
        this.analyzer.getByteFrequencyData(this.buffer);

        let val = 0;
        for (let i = this.fStartIndex; i <= this.fEndIndex; i++) {
            val += this.buffer[i];
        }
        return val / (this.fEndIndex - this.fStartIndex) / 255;
    }

    disconnect() {
        this.analyzer?.disconnect();
    }

}

export const AppAudioTrackAnalyzerFactory: AppAudioTrackAnalyzerApi = {
    createAnalyzer(track: AppMediaStreamTrack, effectiveRange?: [number, number]) {
        return new AppAudioTrackAnalyzerWeb(track as AppUserMediaTrackWeb, effectiveRange);
    }
};
