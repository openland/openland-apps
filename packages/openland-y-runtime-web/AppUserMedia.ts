import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMediaApi } from 'openland-y-runtime-api/AppUserMediaApi';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';
import uuid from 'uuid/v4';

export class AppUserMediaTrackWeb implements AppMediaStreamTrack {
    readonly id: string;
    readonly kind: 'audio' | 'video';
    readonly track: MediaStreamTrack;
    onmute: (() => void) | null = null;
    onunmute: (() => void) | null = null;
    _audio: HTMLAudioElement | undefined;
    volume = 1;

    constructor(track: MediaStreamTrack) {
        this.id = uuid();
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

    set audio(audio: HTMLAudioElement) {
        this._audio = audio;
        audio.volume = this.volume;
    }

    setVolume(v: number) {
        this.volume = v;
        if (this._audio) {
            this._audio.volume = v;
        }
    }

    stop() {
        this.track.stop();
    }
}

class AppUserMediaIpl implements AppUserMediaApi {
    private userAudioPromise: Promise<boolean>;
    private userAudioPromiseResolve?: (done: boolean) => void;
    constructor() {
        this.userAudioPromise = new Promise(r => {
            this.userAudioPromiseResolve = r;
        });
    }
    async getUserAudio(deviceId?: string) {
        let media = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                autoGainControl: false,
                advanced: [{
                    deviceId: deviceId || MediaDevicesManager.instance().getSelectedAudioInput()?.deviceId || 'default'
                }],
            },
        });
        if (this.userAudioPromiseResolve) {
            this.userAudioPromiseResolve(true);
        }

        return new AppUserMediaTrackWeb(media.getAudioTracks()[0]);
    }

    async getUserVideo(deviceId?: string) {
        let media = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                advanced: [{ deviceId: deviceId || MediaDevicesManager.instance().getSelectedVideoInput()?.deviceId || 'default' }],
                height: { ideal: 720 }
            },
        });

        let res = new AppUserMediaTrackWeb(media.getVideoTracks()[0]);
        return res;
    }

    async getUserScreen() {
        let media = await (navigator.mediaDevices as any).getDisplayMedia();
        return new AppUserMediaTrackWeb(media.getVideoTracks()[0]);
    }

    getSilence() {
        let ctx = new AudioContext();
        let oscillator = ctx.createOscillator();
        oscillator.frequency.setValueAtTime(0, ctx.currentTime);
        let dst = ctx.createMediaStreamDestination();
        oscillator.connect(dst);
        oscillator.start();
        let res = dst.stream.getAudioTracks()[0];
        res.enabled = true;
        return new AppUserMediaTrackWeb(res);
    }

    getBlack() {
        let canvas = document.createElement("canvas");
        Object.assign(canvas, { width: 1, height: 1 });
        canvas.getContext('2d')?.fillRect(0, 0, 1, 1);
        let stream = (canvas as any).captureStream();
        let res = stream.getVideoTracks()[0];
        res.enabled = true;
        return new AppUserMediaTrackWeb(res);
    }

    getUserAudioPromise = () => {
        return this.userAudioPromise;
    }
}

export const AppUserMedia = new AppUserMediaIpl();