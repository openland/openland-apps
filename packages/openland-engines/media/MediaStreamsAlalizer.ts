import * as React from 'react';
import { MediaSessionManager } from './MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { MediaStreamManager } from './MediaStreamManager';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { debounce } from 'openland-y-utils/timer';

const AudioContext = canUseDOM && (window.AudioContext // Default
    || (window as any).webkitAudioContext // Safari and old versions of Chrome
    || false);
let audioContext: any;

export class MediaStreamsAlalizer {
    private manager: MediaSessionManager;
    private buffer: Uint8Array | undefined;
    private peerStreamAnalyzers = new Map<
        string,
        {
            analyzer: AnalyserNode;
            stream: MediaStream;
            appSrteam: AppMediaStream;
            isMe?: boolean;
            audioTrack: MediaStreamTrack;
        }
    >();
    private disposeStreamsListener: (() => void) | undefined;
    private running = false;

    private fStartIndex = 0;
    private fEndIndex = 1023;

    constructor(sessionManager: MediaSessionManager) {
        this.manager = sessionManager;
        this.disposeStreamsListener = this.manager.listenStreams(s => {
            s.forEach(sm => {
                let peerId = sm.getTargetPeerId();
                if (peerId) {
                    this.initStreamsAnalizer(peerId, sm.getAudioInStream(), sm);
                }
            });
            if (s.size) {
                let first = s.values().next().value;
                this.initStreamsAnalizer(first.getPeerId(), first.getAudioOutStream(), first, true);
            }
            if (this.buffer && !this.running) {
                this.running = true;
                requestAnimationFrame(this.render);
            }
        });
        if (audioContext?.close) {
            audioContext?.close();
        }
        audioContext = AudioContext ? new AudioContext() : undefined;
    }

    initStreamsAnalizer = (peerId: string, appStream: AppMediaStream | undefined, manager: MediaStreamManager, isMe?: boolean) => {
        // damn you safari
        if (!audioContext) {
            return;
        }
        let ex = this.peerStreamAnalyzers.get(peerId);
        // clean up
        if (ex && ex.appSrteam !== appStream) {
            ex.analyzer.disconnect();
        }
        // create new analyzer
        if (appStream && (!ex || ex.appSrteam !== appStream)) {
            let mediaStream = (appStream as AppUserMediaStreamWeb).getStream();
            let source = (audioContext as AudioContext).createMediaStreamSource(mediaStream);
            let audioTrack = mediaStream.getAudioTracks()[0];
            let analyser = audioContext.createAnalyser();
            const bufferLength = analyser.frequencyBinCount;
            if (!this.buffer) {
                this.buffer = new Uint8Array(bufferLength);
                let fstep = audioContext.sampleRate / 2 / analyser.frequencyBinCount;
                this.fStartIndex = Math.floor(85 / fstep);
                this.fEndIndex = Math.ceil(180 / fstep + 1);
            }
            source.connect(analyser);
            this.peerStreamAnalyzers.set(peerId, {
                stream: mediaStream,
                appSrteam: appStream,
                analyzer: analyser,
                isMe,
                audioTrack
            });
        }
    }

    private lastPeer: string | undefined;
    private lastVals: { [id: string]: boolean } = {};
    private render = () => {
        if (!this.running || !this.buffer) {
            return;
        }
        // initStreamsAnalizers();
        let lastVal = 0;
        let activePeerId: string | undefined;
        for (let [key, entry] of this.peerStreamAnalyzers) {
            if (entry.isMe && entry.stream.getAudioTracks()[0] !== entry.audioTrack) {
                console.warn('rebind analizer');
                entry.analyzer.disconnect();
                entry.analyzer = audioContext.createAnalyser();
                entry.audioTrack = entry.stream.getAudioTracks()[0];
                let source = (audioContext as AudioContext).createMediaStreamSource(entry.stream);
                source.connect(entry.analyzer);
            }
            entry.analyzer.getByteFrequencyData(this.buffer);

            let val = 0;
            for (let i = this.fStartIndex; i <= this.fEndIndex; i++) {
                val += this.buffer[i];
            }
            val = val / (this.fEndIndex - this.fStartIndex) / 255;

            if (entry.isMe && entry.appSrteam.muted) {
                val = 0;
            }

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

        // // animate
        // let scale = 1 + lastVal * 0.4;
        // if (activePeerId && avatarRef.current) {
        //     avatarRef.current.style.transform = `scale(${scale})`;
        // }

        if (activePeerId && (activePeerId !== this.lastPeer)) {
            this.lastPeer = activePeerId;
            this.notifySpeakingPeerIdChangedDebaunced(activePeerId);
        }

        // doing it with requestAnimationFrame bacause 
        // - dont need to analize while in background
        // - it affects animations
        // 
        // mb add timeout to call it not so often?
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
            listeners!.delete(listener);
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
        this.peerStreamAnalyzers.forEach(v => v.analyzer.disconnect());
    }
}