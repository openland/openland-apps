import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';

const AudioContext = canUseDOM && (window.AudioContext // Default
    || (window as any).webkitAudioContext // Safari and old versions of Chrome
    || false);
let audioContext: any;

export class MediaStreamsAlalyzer {
    private buffer: Uint8Array | undefined;
    private peerTrackAnalyzers = new Map<
        string,
        {
            isMe?: boolean;
            analyzer?: AnalyserNode;
            stream?: MediaStream;
            audioTrack?: MediaStreamTrack;
        }
    >();
    private disposeStreamsListener: (() => void) | undefined;
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
                isMe: true,
                audioTrack: (state.sender.audioEnabled && state.sender.audioTrack) ? (state.sender.audioTrack as AppUserMediaTrackWeb).track : undefined
            });
        }
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.render);
        }
    }

    private lastPeer: string | undefined;
    private lastVals: { [id: string]: boolean } = {};
    private render = () => {
        if (!this.running) {
            return;
        }
        let lastVal = 0;
        let activePeerId: string | undefined;
        for (let [key, entry] of this.peerTrackAnalyzers) {
            if (entry.stream?.getAudioTracks()[0] !== entry.audioTrack) {
                console.warn('rebind analizer');
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

                if (val < 0.25) {
                    val = 0;
                }

                if (this.lastVals[key] !== !!val) {
                    this.lastVals[key] = !!val;
                    this.notifyValueChanged(key, !!val);
                }

                if ((val > lastVal || (!activePeerId && !this.lastPeer)) && !entry.isMe) {
                    lastVal = val;
                    activePeerId = key;
                }
            }
        }

        if (activePeerId && (activePeerId !== this.lastPeer)) {
            this.lastPeer = activePeerId;
            this.notifySpeakingPeerIdChangedDebaunced(activePeerId);
        }

        requestAnimationFrame(this.render);
    }

    ////
    // IO
    ////
    private peerValueListeners = new Map<string, Set<(val: boolean) => void>>();
    private debouncedNotifiers = new Map<string, Set<(val: boolean) => void>>();
    notifyValueChanged(peerId: string, val: boolean) {
        let notifiers = this.debouncedNotifiers.get(peerId);
        if (notifiers) {
            for (let n of notifiers) {
                n(val);
            }
        }
    }

    subscribePeer(peerId: string, listener: (val: boolean) => void) {
        let debauncedSet = this.debouncedNotifiers.get(peerId);
        if (!debauncedSet) {
            debauncedSet = new Set();
            this.debouncedNotifiers.set(peerId, debauncedSet);
        }

        let dabounced = debounce((val: boolean) => {
            let ls = this.peerValueListeners.get(peerId);
            if (ls) {
                for (let l of ls) {
                    l(val);
                }
            }
        }, 500);
        debauncedSet.add(dabounced);

        let listeners = this.peerValueListeners.get(peerId);
        if (!listeners) {
            listeners = new Set();
            this.peerValueListeners.set(peerId, listeners);
        }
        listener(this.lastVals[peerId] || false);
        listeners.add(listener);
        return () => {
            listeners?.delete(listener);
            debauncedSet?.delete(dabounced);
        };
    }

    private sepakingPeerListeners = new Set<(peerId: string) => void>();
    notifySpeakingPeerIdChanged = (peerId: string) => {
        for (let l of this.sepakingPeerListeners) {
            l(peerId);
        }
    }
    notifySpeakingPeerIdChangedDebaunced = debounce(this.notifySpeakingPeerIdChanged, 500);

    subscribeSpeakingPeerId(listener: (peerId: string) => void) {
        if (this.lastPeer) {
            listener(this.lastPeer);
        }
        this.sepakingPeerListeners.add(listener);
        return () => {
            this.sepakingPeerListeners.delete(listener);
        };
    }

    useSpeakingPeer = () => {
        let [val, setVal] = React.useState<string>();
        React.useEffect(() => {
            return this.subscribeSpeakingPeerId(setVal);
        }, []);
        return val;
    }

    ////
    // DISPOSE
    ////
    dispose = () => {
        this.running = false;
        if (this.disposeStreamsListener) {
            this.disposeStreamsListener();
        }
        this.peerTrackAnalyzers.forEach(v => v.analyzer?.disconnect());
    }
}