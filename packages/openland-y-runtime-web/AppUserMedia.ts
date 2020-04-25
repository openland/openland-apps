import { AppUserMediaApi, AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

export class AppUserMediaTrackWeb implements AppMediaStreamTrack {
    readonly id: string;
    readonly kind: 'audio' | 'video';
    readonly track: MediaStreamTrack;

    constructor(track: MediaStreamTrack) {
        this.id = track.id;
        this.track = track;
        if (track.kind === 'audio') {
            this.kind = 'audio';
        } else if (track.kind === 'video') {
            this.kind = 'video';
        } else {
            throw Error('Unknwon track kind: ' + track.kind);
        }
    }

    get enabled() {
        return this.track.enabled;
    }

    set enabled(v: boolean) {
        this.track.enabled = v;
    }

    stop() {
        this.track.stop();
    }
}

export const AppUserMedia: AppUserMediaApi = {
    async getUserAudio(deviceId?: string) {

        let media = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                autoGainControl: false,
                advanced: [{
                    deviceId: deviceId || MediaDevicesManager.instance().getSelectedInput()?.deviceId || 'default'
                }],
            },
        });

        let res = new AppUserMediaTrackWeb(media.getAudioTracks()[0]);
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
                advanced: [{ deviceId: deviceId || MediaDevicesManager.instance().getSelectedVideoInput()?.deviceId || 'default' }],

            },
        });

        let res = new AppUserMediaTrackWeb(media.getVideoTracks()[0]);
        if (media.getVideoTracks().length) {
            MediaDevicesManager.instance().updateVideoOutputStreamIfNeeded(res);
        }
        return res;
    },

    async getUserScreen() {
        let media = await (navigator.mediaDevices as any).getDisplayMedia();
        return new AppUserMediaTrackWeb(media.getVideoTracks()[0]);
    }
};