import { AppUserMediaApi, AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

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
        MediaDevicesManager.instance().notifyOutputStreamClosed(this);
        // this._stream.stop();
    }

    getStream = () => {
        return this._stream;
    }
}

export const AppUserMedia: AppUserMediaApi = {
    async getUserAudio(deviceId?: string) {

        let media = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                autoGainControl: false,
                advanced: [{ deviceId: deviceId || MediaDevicesManager.instance().getSelectedInput()?.deviceId || 'default' }],
            },
        });

        let res = new AppUserMediaStreamWeb(media);

        if (media.getAudioTracks().length) {
            MediaDevicesManager.instance().updateAudioOutputStreamIfeeded(res);
        }
        if (media.getVideoTracks().length) {
            MediaDevicesManager.instance().updateVideoOutputStreamIfNeeded(res);
        }

        return res;
    },

    async getUserVideo(deviceId?: string) {
        let media = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                advanced: [{ deviceId: deviceId ||  MediaDevicesManager.instance().getSelectedVideoInput()?.deviceId || 'default' }],

            },
        });

        let res = new AppUserMediaStreamWeb(media);

        if (media.getVideoTracks().length) {
            MediaDevicesManager.instance().updateVideoOutputStreamIfNeeded(res);
        }

        return res;
    },

    async getUserScreen() {
        let media = await (navigator.mediaDevices as any).getDisplayMedia();
        return new AppUserMediaStreamWeb(media);
    }
};