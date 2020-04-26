import * as React from 'react';
import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { MediaSessionManager } from './media/MediaSessionManager';
// import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';

// export type CallStatus = 'initial' | 'connecting' | 'connected' | 'end' | 'waiting';

// export interface CallState {
//     avatar?: { id: string, title: string, picture?: string | null };
//     conversationId?: string;
//     private?: boolean;
//     startTime?: number;
//     status: CallStatus;
//     video?: AppMediaStreamTrack;
//     screenShare?: AppMediaStreamTrack;
//     videoEnabled?: boolean;
// }

export class CallsEngine {
    readonly messenger: MessengerEngine;
    readonly client: OpenlandClient;

    private _mediaSession: MediaSessionManager | null = null;
    private _sessionSubscriptions: ((state: MediaSessionManager | null) => void)[] = [];

    constructor(messenger: MessengerEngine) {
        this.messenger = messenger;
        this.client = messenger.client;
    }

    get currentMediaSession() {
        return this._mediaSession;
    }

    joinCall = (conversationId: string) => {
        if (this._mediaSession) {
            if (this._mediaSession.conversationId === conversationId) {
                return;
            } else {
                this._mediaSession.destroy();
                this._mediaSession = null;
            }
        }

        let manager = new MediaSessionManager(this.messenger, conversationId);
        manager.onDestoy = () => {
            if (this._mediaSession === manager) {
                this._mediaSession = null;
                this.notifyCurrentSession();
            }
        };
        this._mediaSession = manager;
        this.notifyCurrentSession();
    }

    leaveCall = () => {
        if (this._mediaSession) {
            this._mediaSession.destroy();
            this._mediaSession = null;
            this.notifyCurrentSession();
        }
    }

    useCurrentSession = () => {
        let [res, setRes] = React.useState(this._mediaSession);
        React.useEffect(() => {
            this._sessionSubscriptions.push(setRes);
            if (res !== this._mediaSession) {
                setRes(this._mediaSession);
            }
            return () => {
                let ind = this._sessionSubscriptions.indexOf(setRes);
                if (ind >= 0) {
                    this._sessionSubscriptions.splice(ind, 1);
                }
            };
        }, []);
        return res;
    }

    private notifyCurrentSession() {
        let ss = this._mediaSession;
        for (let s of [...this._sessionSubscriptions]) {
            s(ss);
        }
    }
}