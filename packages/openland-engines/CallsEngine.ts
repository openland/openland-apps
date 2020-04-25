import * as React from 'react';
import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { MediaSessionManager } from './media/MediaSessionManager';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';

export type CallStatus = 'initial' | 'connecting' | 'connected' | 'end' | 'waiting';

export interface CallState {
    avatar?: { id: string, title: string, picture?: string | null };
    conversationId?: string;
    private?: boolean;
    startTime?: number;
    status: CallStatus;
    mute: boolean;
    video?: AppMediaStreamTrack;
    screenShare?: AppMediaStreamTrack;
    videoEnabled?: boolean;
}

export class CallsEngine {
    readonly messenger: MessengerEngine;
    readonly client: OpenlandClient;

    private mediaSession?: MediaSessionManager;
    private _state: CallState = { status: 'initial', mute: false };
    private _stateSubscriptions: ((state: CallState) => void)[] = [];

    constructor(messenger: MessengerEngine) {
        this.messenger = messenger;
        this.client = messenger.client;
    }

    get state(): CallState {
        return this._state;
    }

    joinCall = (conversationId: string, isPrivate: boolean, avatar?: { id: string, title: string, picture?: string | null }) => {
        if (this.mediaSession?.conversationId === conversationId) {
            return;
        }
        if (this.mediaSession) {
            this.mediaSession.destroy();
        }
        this.mediaSession = new MediaSessionManager(this.messenger, this.client, conversationId, this._state.mute, !!isPrivate, (status, startTime) => this.setState({ ...this._state, status, private: !!isPrivate, startTime }), this.leaveCall, this.onVideoEnabled);
        this.mediaSession.outVideoVM.listen((s) => {
            this.setState({ ... this._state, video: s[0] ? s[0].enabled ? s[0] : undefined : undefined });
            this.setState({ ... this._state, screenShare: s[1] ? s[1].enabled ? s[1] : undefined : undefined });
        });
        this.setState({ mute: false, status: 'connecting', conversationId, private: isPrivate, avatar });
    }

    leaveCall = () => {
        if (this.mediaSession) {
            this.mediaSession.destroy();
            this.mediaSession = undefined;
            this.setState({ mute: false, status: 'end' });
            this.setState({ mute: false, status: 'initial' });
        }
    }

    setMute = (mute: boolean) => {
        this.setState({ ...this._state, mute });
        if (this.mediaSession) {
            this.mediaSession.setMute(mute);
        }
    }

    switchVideo = async () => {
        if (this.mediaSession) {
            await (this.state.video ? this.mediaSession.stopVideo : this.mediaSession.startVideo)();
        }
    }

    switchScreenShare = async () => {
        if (this.mediaSession) {
            await (this.state.screenShare ? this.mediaSession.stopScreenShare : this.mediaSession.startScreenShare)();
        }
    }

    onVideoEnabled = () => {
        if (!this.state.videoEnabled) {
            this.setState({ ...this._state, videoEnabled: true });
        }
    }

    useState = () => {
        let [res, setRes] = React.useState(this._state);
        React.useEffect(() => {
            this._stateSubscriptions.push(setRes);
            return () => {
                let ind = this._stateSubscriptions.indexOf(setRes);
                if (ind >= 0) {
                    this._stateSubscriptions.splice(ind, 1);
                }
            };
        }, []);
        return res;
    }

    listenState = (listener: (state: CallState) => void) => {
        this._stateSubscriptions.push(listener);
        return () => {
            let ind = this._stateSubscriptions.indexOf(listener);
            listener(this.state);
            if (ind >= 0) {
                this._stateSubscriptions.splice(ind, 1);
            }
        };
    }

    private setState = (value: CallState) => {
        this._state = value;
        for (let f of this._stateSubscriptions) {
            f(value);
        }
    }

    getMediaSession = () => {
        return this.mediaSession;
    }
}