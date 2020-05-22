import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMediaApi } from 'openland-y-runtime-api/AppUserMediaApi';
import { mediaDevices, MediaStreamTrack, MediaStream } from 'react-native-webrtc';

export class AppUserMediaStreamTrackNative implements AppMediaStreamTrack {
    readonly id: string;
    readonly kind: 'audio' | 'video';
    readonly track: MediaStreamTrack;
    onmute: (() => void) | null = null;
    onunmute: (() => void) | null = null;

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
        this.track.onmute = () => {
            if (this.onmute) {
                this.onmute();
            }
        };
        this.track.onunmute = () => {
            if (this.onunmute) {
                this.onunmute();
            }
        };
    }

    get muted() {
        return this.track.muted;
    }

    get enabled() {
        return this.track.enabled;
    }

    set enabled(v: boolean) {
        this.track.enabled = v;
    }

    setVolume(v: number) {
        this.enabled = !!v;
    }

    stop = () => {
        this.track.stop();
    }
}

export const AppUserMedia: AppUserMediaApi = {
    async getUserAudio() {
        let media = await mediaDevices.getUserMedia({ audio: true, video: false });
        if (!media) {
            throw new Error('audio denied');
        }
        let stream = media as MediaStream;
        return new AppUserMediaStreamTrackNative(stream.getAudioTracks()[0]);
    },

    async getUserVideo() {
        let media = await mediaDevices.getUserMedia({ audio: false, video: true });
        if (!media) {
            throw new Error('video denied');
        }
        let stream = media as MediaStream;
        return new AppUserMediaStreamTrackNative(stream.getVideoTracks()[0]);
    },

    async getUserScreen() {
        throw Error('not implemented yet');
    }
};