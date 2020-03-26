import { AppUserMediaApi, AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

export class AppUserMediaStreamWeb implements AppMediaStream {
    readonly id: string;
    private _muted = false;
    private _blinded = false;
    readonly _stream: MediaStream;
    onClosed: (() => void) | undefined;

    constructor(stream: MediaStream) {
        this.id = stream.id;
        this._stream = stream;
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

    get blinded() {
        return this._blinded;
    }

    set blinded(val: boolean) {
        if (this._blinded !== val) {
            this._blinded = val;
            for (let t of this._stream.getVideoTracks()) {
                t.enabled = !val;
            }
        }
    }

    close = () => {
        for (let t of this._stream.getTracks()) {
            t.stop();
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

    async getUserVideo() {
        let media = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        });

        return new AppUserMediaStreamWeb(media);
    },

    async getUserScreen() {
        let media = await (navigator.mediaDevices as any).getDisplayMedia();
        return new AppUserMediaStreamWeb(media);
    }
};