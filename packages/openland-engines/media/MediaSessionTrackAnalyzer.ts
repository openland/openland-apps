import * as React from 'react';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionState, MediaSessionCommand } from './MediaSessionState';
import { Reducer } from 'openland-y-utils/reducer';

import { AppAudioTrackAnalyzer } from 'openland-y-runtime-api/AppAudioTrackAnalyzerApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppAudioTrackAnalyzerFactory } from 'openland-y-runtime/AppAudioTrackAnalyzer';

class MediaSessionTrackAnalyzer {
    listeners = new Set<(peersVolume: { [id: string]: number }) => void>();
    peerVolume: { [id: string]: number } = {};

    private peerTrackAnalyzers = new Map<
        string,
        {
            analyzer?: AppAudioTrackAnalyzer;
            audioTrack: AppMediaStreamTrack | null;
        }
    >();
    private interval?: NodeJS.Timeout;
    private running = false;

    setSessionState = (state: MediaSessionState) => {
        for (let k of Object.keys(state.receivers)) {
            let r = state.receivers[k]!;
            this.peerTrackAnalyzers.set(k, {
                audioTrack: r.audioTrack
            });
        }
        if (state.sender.id && state.sender.audioEnabled) {
            this.peerTrackAnalyzers.set(state.sender.id, {
                audioTrack: (state.sender.audioEnabled && state.sender.audioTrack) || null
            });
        }
        if (!this.running) {
            this.running = true;
            this.interval = setInterval(this.render, 50);
        }
    }

    private render = () => {
        if (!this.running) {
            return;
        }
        for (let [key, entry] of this.peerTrackAnalyzers) {
            if (entry.analyzer?.track !== entry.audioTrack) {
                entry.analyzer?.disconnect();
                entry.analyzer = undefined;

                if (entry.audioTrack) {
                    entry.analyzer = AppAudioTrackAnalyzerFactory.createAnalyzer(entry.audioTrack, [80, 180]);
                }
            }
            if (entry.analyzer) {
                this.peerVolume[key] = entry.analyzer.getVolume();
            }
        }

        for (let l of this.listeners) {
            l(this.peerVolume);
        }
    }

    listenPeersVolume(listener: (peersVolume: { [id: string]: number; }) => void) {
        this.listeners.add(listener);
        listener(this.peerVolume);
        return () => this.listeners.delete(listener);
    }

    dispose() {
        this.running = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.peerTrackAnalyzers.forEach(v => v.analyzer?.disconnect());
    }

}

export class MediaSessionTrackAnalyzerManager {
    analyzer: MediaSessionTrackAnalyzer;
    state: MediaSessionState | undefined;

    analyzerSubscription: () => void;
    stateSubscription: () => void;

    constructor(stateModel: Reducer<MediaSessionState, MediaSessionCommand>) {
        this.stateSubscription = stateModel.listenValue(this.setSessionState);
        this.analyzer = new MediaSessionTrackAnalyzer();
        this.analyzerSubscription = this.analyzer.listenPeersVolume(this.onChange);
    }

    setSessionState = (state: MediaSessionState) => {
        this.state = state;
        this.analyzer.setSessionState(state);
    }

    private lastPeer: string | undefined;
    private lastVals: { [id: string]: boolean } = {};
    onChange = (values: { [peerId: string]: number }) => {
        let lastVal = 0;
        let activePeerId: string | undefined;
        for (let [key, val] of Object.entries(values)) {

            if (val < 0.25) {
                val = 0;
            }

            if (this.lastVals[key] !== !!val) {
                this.lastVals[key] = !!val;
                this.notifyValueChanged(key, !!val);
            }

            if ((val > lastVal || (!activePeerId && !this.lastPeer)) && (key !== this.state?.sender.id)) {
                lastVal = val;
                activePeerId = key;
            }
        }

        if (activePeerId && (activePeerId !== this.lastPeer)) {
            this.lastPeer = activePeerId;
            this.notifySpeakingPeerIdChangedDebaunced(activePeerId);
        }

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

    usePeer = (peerId: string) => {
        let [val, setVal] = React.useState<boolean>();
        React.useEffect(() => {
            return this.subscribePeer(peerId, setVal);
        }, []);
        return val;
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

    dispose = () => {
        this.stateSubscription();
        this.analyzerSubscription();
        this.analyzer.dispose();
    }
}