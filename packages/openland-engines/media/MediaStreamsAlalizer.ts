import * as React from 'react';
import { MediaSessionManager } from './MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { MediaStreamManager } from './MediaStreamManager';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

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
        }
    >();
    private disposeStreamsListener: (() => void) | undefined;
    private running = false;

    constructor(sessionManager: MediaSessionManager) {
        this.manager = sessionManager;
        this.disposeStreamsListener = this.manager.listenStreams(s => {
            s.forEach(sm => {
                let peerId = sm.getTargetPeerId();
                if (peerId) {
                    this.initStreamsAnalizer(peerId, sm.getInStream(), sm);
                }
            });
            if (s.size) {
                let first = s.values().next().value;
                this.initStreamsAnalizer(first.getPeerId(), first.getStream(), first, true);
            }
            if (this.buffer && !this.running) {
                this.running = true;
                requestAnimationFrame(this.render);
            }
        });
    }

    initStreamsAnalizer = (peerId: string, appStream: AppMediaStream | undefined, manager: MediaStreamManager, isMe?: boolean) => {
        // damn you safari
        if (!(window as any).AudioContext) {
            return;
        }
        let ex = this.peerStreamAnalyzers.get(peerId);
        // clean up
        if (ex && ex.appSrteam !== appStream) {
            ex.analyzer.disconnect();
        }
        // create new analyzer
        if (appStream && (!ex || ex.appSrteam !== appStream)) {
            let context = new AudioContext();
            let mediaStream = (appStream as AppUserMediaStreamWeb).getStream();
            let source = context.createMediaStreamSource(mediaStream);
            let analyser = context.createAnalyser();
            const bufferLength = analyser.frequencyBinCount;
            if (!this.buffer) {
                this.buffer = new Uint8Array(bufferLength);
            }
            source.connect(analyser);
            this.peerStreamAnalyzers.set(peerId, {
                stream: mediaStream,
                appSrteam: appStream,
                analyzer: analyser,
                isMe,
            });
        }
    }

    private lastPeer: string | undefined;
    private lastVals: { [id: string]: number } = {};
    private render = () => {
        if (!this.running || !this.buffer) {
            return;
        }
        // initStreamsAnalizers();
        let lastVal = 0;
        let activePeerId: string | undefined;
        for (let [key, entry] of this.peerStreamAnalyzers) {
            entry.analyzer.getByteFrequencyData(this.buffer);
            let val = Math.min(
                1,
                this.buffer.reduce((res, x) => {
                    return res + x;
                }, 0) /
                this.buffer.length /
                10,
            );

            if (entry.isMe && entry.appSrteam.muted) {
                val = 0;
            }

            if (lastVal[key] !== val) {
                this.lastVals[key] = val;
                this.notifyValueChanged(key, val);
            }

            if (val < 0.2) {
                val = 0;
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
            this.notifySpeakingPeerIdChanged(activePeerId);
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
    notifyValueChanged(peerId: string, val: number) {
        let listeners = this.peerValueListeners.get(peerId);
        if (listeners) {
            for (let l of listeners) {
                l(val);
            }
        }
    }

    private peerValueListeners = new Map<string, Set<(val: number) => void>>();
    subscribePeer(peerId: string, listener: (val: number) => void) {
        let listeners = this.peerValueListeners.get(peerId);
        if (!listeners) {
            listeners = new Set();
            this.peerValueListeners.set(peerId, listeners);
        }
        listener(this.lastVals[peerId] || 0);
        listeners.add(listener);
        return () => {
            listeners!.delete(listener);
        };
    }

    usePeerValue = (peerId: string) => {
        let [val, setVal] = React.useState(0);
        React.useEffect(() => {
            return this.subscribePeer(peerId, setVal);
        }, [peerId]);
        return val;
    }

    notifySpeakingPeerIdChanged(peerId: string) {
        for (let l of this.sepakingPeerListeners) {
            l(peerId);
        }
    }

    private sepakingPeerListeners = new Set<(peerId: string) => void>();
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