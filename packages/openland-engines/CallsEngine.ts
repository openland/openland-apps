import * as React from 'react';
import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { MediaSessionManager } from './media/MediaSessionManager';

export type CallStatus = 'initial' | 'connecting' | 'connected' | 'end' | 'waiting';
export interface CallState {
    conversationId?: string;
    private?: boolean;
    startTime?: number;
    status: CallStatus;
    mute: boolean;
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

    joinCall = (conversationId: string, isPrivate: boolean) => {
        if (this.mediaSession) {
            this.mediaSession.destroy();
        }
        this.mediaSession = new MediaSessionManager(this.client, conversationId, this._state.mute, !!isPrivate, (status, startTime) => this.setState({ ...this._state, status, private: !!isPrivate, startTime }), this.leaveCall);
        this.setState({ mute: false, status: 'connecting', conversationId, private: isPrivate });
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

    useState = () => {
        let [res, setRes] = React.useState(this._state);
        React.useEffect(() => {
            this._stateSubscriptions.push((s) => setRes(s));
        }, [])
        return res;
    }

    private setState = (value: CallState) => {
        this._state = value;
        for (let f of this._stateSubscriptions) {
            f(value);
        }
    }
}