import * as React from 'react';
import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { MediaSessionManager } from './media/MediaSessionManager';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

export type CallStatus = 'initial' | 'connecting' | 'connected' | 'end' | 'waiting';

type LocalVideo = { type: 'screen' | 'video', stream: AppMediaStream };
export interface CallState {
    avatar?: { id: string, title: string, picture?: string | null };
    conversationId?: string;
    private?: boolean;
    startTime?: number;
    status: CallStatus;
    mute: boolean;
    outVideo?: LocalVideo;
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
        if (this.mediaSession) {
            this.mediaSession.destroy();
        }
        this.mediaSession = new MediaSessionManager(this.client, conversationId, this._state.mute, !!isPrivate, (status, startTime) => this.setState({ ...this._state, status, private: !!isPrivate, startTime }), this.leaveCall, this.onVideoEnabled);
        this.setState({ mute: false, status: 'connecting', conversationId, private: isPrivate, avatar });
    }

    leaveCall = () => {
        if (this.mediaSession) {
            this.mediaSession.destroy();
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

    switchScreenShare = async () => {
        await this.switchMedia('screen');
    }

    switchVideo = async () => {
        await this.switchMedia('video');
    }

    onVideoEnabled = () => {
        if (!this.state.videoEnabled) {
            this.setState({ ...this._state, videoEnabled: true });
        }
    }

    private switchMedia = async (source: 'video' | 'screen') => {
        let localVideo: LocalVideo | undefined = undefined;
        if (this.mediaSession) {
            if (source !== this.state.outVideo?.type) {
                let stream = await (source === 'video' ? this.mediaSession.startVideo : this.mediaSession.startScreenShare)();
                if (stream) {
                    localVideo = { type: source, stream };
                }
            } else {
                (source === 'video' ? this.mediaSession.stopVideo : this.mediaSession.stopScreenShare)();
            }
        }
        this.setState({ ...this._state, outVideo: localVideo });
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