import { AppUserMediaApi, AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { mediaDevices, MediaStream } from 'react-native-webrtc';

export class AppUserMediaStreamNative implements AppMediaStream {
    _blinded = false;
    private _muted = false;
    readonly _stream: MediaStream;
    readonly id: string;
    onClosed: (() => void) | undefined;

    constructor(stream: MediaStream) {
        this.id = stream.id;
        this._stream = stream;
    }
    hasAudio(): boolean {
        return !!this._stream.getAudioTracks().length;
    }
    hasVideo(): boolean {
        return !!this._stream.getVideoTracks().length;
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
    }
}

export const AppUserMedia: AppUserMediaApi = {
    async getUserAudio() {
        let media = await mediaDevices.getUserMedia({ audio: true, video: false });
        if (!media) {
            throw new Error('audio denied');
        }
        return new AppUserMediaStreamNative(media as MediaStream);
    },

    async getUserVideo() {
        let media = await mediaDevices.getUserMedia({ audio: false, video: true });
        if (!media) {
            throw new Error('video denied');
        }
        return new AppUserMediaStreamNative(media as MediaStream);
    },

    async getUserScreen() {
        throw Error('not implemented yet');
    }
};