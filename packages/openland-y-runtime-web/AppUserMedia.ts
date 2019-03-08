import { AppUserMediaApi, AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

export class AppUserMediaStreamWeb implements AppMediaStream {
    private _muted = false;
    readonly _stream: MediaStream;

    constructor(stream: MediaStream) {
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

    close = () => {
        for (let t of this._stream.getTracks()) {
            t.stop();
        }
        // this._stream.stop();
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
    }
};