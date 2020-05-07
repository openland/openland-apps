import { AppMediaSessionTrackAnalyzerApi, AppMediaSessionTrackAnalyzer } from "openland-y-runtime-api/AppMediaSessionTrackAnalyzerApi";
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { AppUserMediaTrackWeb } from './AppUserMedia';

const AudioContext = canUseDOM && (window.AudioContext // Default
    || (window as any).webkitAudioContext // Safari and old versions of Chrome
    || false);
let audioContext: any;

class AppMediaSessionTrackAnalyzerWeb implements AppMediaSessionTrackAnalyzer {
    listeners = new Set<(peersVolume: { [id: string]: number }) => void>();
    peerVolume: { [id: string]: number } = {};

    private buffer: Uint8Array | undefined;
    private peerTrackAnalyzers = new Map<
        string,
        {
            analyzer?: AnalyserNode;
            stream?: MediaStream;
            audioTrack?: MediaStreamTrack;
        }
    >();
    private running = false;

    private fStartIndex = 0;
    private fEndIndex = 1023;

    constructor() {
        if (audioContext?.close) {
            audioContext?.close();
        }
        audioContext = AudioContext ? new AudioContext() : undefined;
    }

    setSessionState = (state: MediaSessionState) => {
        for (let k of Object.keys(state.receivers)) {
            let r = state.receivers[k]!;
            this.peerTrackAnalyzers.set(k, {
                audioTrack: r.audioTrack ? (r.audioTrack as AppUserMediaTrackWeb).track : undefined
            });
        }
        if (state.sender.id && state.sender.audioEnabled) {
            this.peerTrackAnalyzers.set(state.sender.id, {
                audioTrack: (state.sender.audioEnabled && state.sender.audioTrack) ? (state.sender.audioTrack as AppUserMediaTrackWeb).track : undefined
            });
        }
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.render);
        }
    }

    private render = () => {
        if (!this.running) {
            return;
        }
        for (let [key, entry] of this.peerTrackAnalyzers) {
            if (entry.stream?.getAudioTracks()[0] !== entry.audioTrack) {
                console.log('rebind analizer');
                entry.analyzer?.disconnect();
                entry.analyzer = undefined;

                if (entry.audioTrack) {
                    entry.stream = new MediaStream();
                    entry.stream.addTrack(entry.audioTrack);

                    let analyzer = audioContext.createAnalyser();
                    const bufferLength = analyzer.frequencyBinCount;
                    if (!this.buffer) {
                        this.buffer = new Uint8Array(bufferLength);
                        let fstep = audioContext.sampleRate / 2 / analyzer.frequencyBinCount;
                        this.fStartIndex = Math.floor(85 / fstep);
                        this.fEndIndex = Math.ceil(180 / fstep + 1);
                    }

                    entry.analyzer = analyzer;
                    let source = (audioContext as AudioContext).createMediaStreamSource(entry.stream);
                    source.connect(analyzer);
                }
            }
            if (entry.analyzer && this.buffer) {
                entry.analyzer.getByteFrequencyData(this.buffer);

                let val = 0;
                for (let i = this.fStartIndex; i <= this.fEndIndex; i++) {
                    val += this.buffer[i];
                }
                val = val / (this.fEndIndex - this.fStartIndex) / 255;
                this.peerVolume[key] = val;
            }
        }

        for (let l of this.listeners) {
            l(this.peerVolume);
        }

        requestAnimationFrame(this.render);
    }

    listenPeersVolume(listener: (peersVolume: { [id: string]: number; }) => void) {
        this.listeners.add(listener);
        listener(this.peerVolume);
        return () => this.listeners.delete(listener);
    }

    dispose() {
        this.running = false;
        this.peerTrackAnalyzers.forEach(v => v.analyzer?.disconnect());
    }

}

export const AppMediaSessionTrackAnalyzerFactory: AppMediaSessionTrackAnalyzerApi = {
    createAnalyzer() {
        return new AppMediaSessionTrackAnalyzerWeb();
    }
};
