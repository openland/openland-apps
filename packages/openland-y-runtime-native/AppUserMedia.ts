import { AppUserMediaApi, AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { mediaDevices } from 'react-native-webrtc';

export class AppUserMediaStreamNative implements AppMediaStream {
    private _muted = false;
    readonly _stream: any;

    constructor(stream: any) {
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
    }
}

export const AppUserMedia: AppUserMediaApi = {
    async getUserAudio() {
        let media = await mediaDevices.getUserMedia({ audio: true, video: false });
        return new AppUserMediaStreamNative(media);
    }
};