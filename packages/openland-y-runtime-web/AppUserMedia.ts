import { AppUserMediaApi, AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

export class AppUserMediaStreamWeb implements AppMediaStream {
    readonly id: string;
    private _muted = false;
    readonly _stream: MediaStream;
    onClosed: (() => void) | undefined;

    constructor(stream: MediaStream) {
        this.id = stream.id;
        this._stream = stream;
        this._stream.getTracks().forEach(this.trackEnd);
        this._stream.onaddtrack = (ev) => {
            this.trackEnd(ev.track);
        };

        this._stream.onremovetrack = () => {
            if (this.onClosed && (this._stream.getTracks().length === 0)) {
                this.onClosed();
            }
        };
    }

    trackEnd = (track: MediaStreamTrack) => {
        track.onended = () => {
            this._stream.removeTrack(track);
        };
    }

    get muted() {
        return this._muted;
    }

    set muted(val: boolean) {
        if (this._muted !== val) {
            this._muted = val;
            for (let t of this._stream.getAudioTracks()) {
                t.enabled = !val;
            }
        }
    }

    close = () => {
        for (let t of this._stream.getTracks()) {
            t.stop();
            this._stream.removeTrack(t);
        }
        // this._stream.stop();
    }

    getStream = () => {
        return this._stream;
    }
}

export const AppUserMedia: AppUserMediaApi = {
    async getUserAudio() {
        let media = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                autoGainControl: false,
            } as any,
        });

        return new AppUserMediaStreamWeb(media);
    },

    async getUserScreen() {
        let media = await (navigator.mediaDevices as any).getDisplayMedia();
        return new AppUserMediaStreamWeb(media);
    }
};