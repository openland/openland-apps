import * as React from 'react';
import { AppMediaSessionTrackAnalyzerFactory } from 'openland-y-runtime/AppMediaSessionTrackAnalyzer';
import { AppMediaSessionTrackAnalyzer } from 'openland-y-runtime-api/AppMediaSessionTrackAnalyzerApi';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionState, MediaSessionCommand } from './MediaSessionState';
import { Reducer } from 'openland-y-utils/reducer';

export class MediaSessionTrackAnalyzer {
    analyzer: AppMediaSessionTrackAnalyzer;
    state: MediaSessionState | undefined;

    analyzerSubscription: () => void;
    stateSubscription: () => void;

    constructor(stateModel: Reducer<MediaSessionState, MediaSessionCommand>) {
        this.stateSubscription = stateModel.listenValue(this.setSessionState);
        this.analyzer = AppMediaSessionTrackAnalyzerFactory.createAnalyzer();
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