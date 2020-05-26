import { AppPeerTransceiverParams, AppSessionDescription } from './../openland-y-runtime-api/AppPeerConnectionApi';
import {
    AppPeerConnectionApi,
    AppPeerConnectionConfiguration,
    AppPeerConnection,
    AppRtpTransceiver,
    AppRtpSender,
    AppRtpReceiver
} from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMediaTrackWeb, AppUserMedia } from './AppUserMedia';
import uuid from 'uuid/v4';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

export class AppRtpReceiverWeb implements AppRtpReceiver {
    raw: RTCRtpReceiver;
    readonly track: AppUserMediaTrackWeb;

    constructor(raw: RTCRtpReceiver) {
        this.raw = raw;
        this.track = new AppUserMediaTrackWeb(raw.track);
    }
}

export class AppRtpSenderWeb implements AppRtpSender {
    raw: RTCRtpSender;

    constructor(raw: RTCRtpSender) {
        this.raw = raw;
    }

    replaceTrack(track: AppMediaStreamTrack | null) {
        if (track) {
            let rawTrack = (track as AppUserMediaTrackWeb).track;
            this.raw.replaceTrack(rawTrack);
        } else {
            this.raw.replaceTrack(null);
        }
    }
}

export class AppRtpTransceiverWeb implements AppRtpTransceiver {

    raw: RTCRtpTransceiver;
    readonly id: string;
    readonly sender: AppRtpSender;
    readonly receiver: AppRtpReceiver;

    constructor(id: string, raw: RTCRtpTransceiver) {
        this.raw = raw;
        this.id = id;
        this.sender = new AppRtpSenderWeb(raw.sender);
        this.receiver = new AppRtpReceiverWeb(raw.receiver);
    }

    get mid() {
        return this.raw.mid;
    }

    get direction() {
        return this.raw.direction;
    }

    set direction(value: 'inactive' | 'recvonly' | 'sendonly' | 'sendrecv' | 'stopped') {
        this.raw.direction = value;
    }

    get currentDirection() {
        return this.raw.currentDirection;
    }

    stop = () => {
        this.raw.stop();
    }
}

export class AppPeerConnectionWeb implements AppPeerConnection {
    private connection: RTCPeerConnection;
    private started = true;
    private audioTracks = new Map<string, HTMLAudioElement>();
    private audioDevcieSubscription: () => void;
    private transeivers = new Map<string, AppRtpTransceiverWeb>();
    private transceiverIds = new Map<RTCRtpTransceiver, string>();

    oniceconnectionstate: ((state: 'checking' | 'closed' | 'completed' | 'connected' | 'disconnected' | 'failed' | 'new') => void) | undefined = undefined;
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev) => {
            if (!this.started) {
                return;
            }
            if (this.onicecandidate) {
                this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });
            }
        };
        this.connection.oniceconnectionstatechange = () => {
            if (!this.started) {
                if (this.oniceconnectionstate) {
                    this.oniceconnectionstate(this.connection.iceConnectionState);
                }
            }
        };
        this.audioDevcieSubscription = MediaDevicesManager.instance().listenAudioOutputDevice(d => {
            for (let t of this.audioTracks.values()) {
                this.setAudioDevice(t, d?.deviceId);
            }
        });
    }

    addTransceiver = async (arg: 'audio' | 'video' | AppMediaStreamTrack, params?: AppPeerTransceiverParams) => {
        let transceiver: RTCRtpTransceiver;
        if (arg === 'audio') {
            transceiver = this.connection.addTransceiver('audio', params);
        } else if (arg === 'video') {
            transceiver = this.connection.addTransceiver('video', params);
        } else {
            let track = (arg as AppUserMediaTrackWeb).track;
            transceiver = this.connection.addTransceiver(track, params);
        }
        return this._wrap(transceiver);
    }

    getTransceivers() {
        return [...this.transeivers.values()];
    }

    createOffer = async () => {
        // console.log('[PC:' + this.id + '] createOffer');
        let res = await this.connection.createOffer();
        return {
            type: res.type! as 'offer',
            sdp: res.sdp!
        };
    }

    setLocalDescription = async (sdp: AppSessionDescription) => {
        // console.log('[PC:' + this.id + '] setLocalDescription');
        // console.log('[PC:' + this.id + ']', sdp.sdp);
        await this.connection.setLocalDescription(sdp);
        this._applyTranseivers();
    }

    setRemoteDescription = async (sdp: AppSessionDescription) => {
        // console.log('[PC:' + this.id + '] setRemoteDescription');
        // console.log('[PC:' + this.id + ']', sdp.sdp);
        await this.connection.setRemoteDescription(sdp);
        this._applyTranseivers();
    }

    createAnswer = async () => {
        // console.log('[PC:' + this.id + '] createAnswer');
        let res = await this.connection.createAnswer();
        return {
            type: res.type! as 'answer',
            sdp: res.sdp!
        };
    }

    addIceCandidate = (candidate: string) => {
        return this.connection.addIceCandidate(JSON.parse(candidate));
    }

    close = () => {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.audioDevcieSubscription();
        this.connection.close();
    }

    private _applyTranseivers() {
        if (!this.started) {
            return;
        }

        //
        // Merge Transeivers
        //

        for (let t of this.connection.getTransceivers()) {
            this._wrap(t);
        }

        //
        // Play incoming audio
        //
        // NOTE: Initially i wanted to remove audio tracks
        //       when transeiver is stopped, but i expect
        //       that audio and be played a little bit longer 
        //       after transceiver stopping. I don't think that 
        //       it will eat many resources anyway.
        //

        for (let t of this.getTransceivers()) {
            if ((t.direction === 'recvonly' || t.direction === 'sendrecv') && t.receiver.track.kind === 'audio') {
                if (this.audioTracks.has(t.id)) {
                    continue;
                }
                console.log('[WEBRTC]: Play track: ' + t.id);
                let track = (t.receiver.track as AppUserMediaTrackWeb).track;
                track.onunmute = () => {
                    console.log('[WEBRTC]: Unmuted: ' + t.id);
                };
                track.onmute = () => {
                    console.log('[WEBRTC]: Muted: ' + t.id);
                };
                let audio = new Audio();
                let stream = new MediaStream();
                stream.addTrack((t.receiver.track as AppUserMediaTrackWeb).track);
                audio.autoplay = true;
                audio.setAttribute('playsinline', 'true');
                audio.controls = false;
                this.setAudioDevice(audio, MediaDevicesManager.instance().getSelectedAudioInput()?.deviceId);
                audio.srcObject = stream;
                audio.load();

                (async () => {
                    // wait for user to allow mic use - in this case safari allows to play audio event without user input event
                    await AppUserMedia.getUserAudioPromise();
                    audio.play();
                })();
                (t.receiver.track as AppUserMediaTrackWeb).audio = audio;
                this.audioTracks.set(t.id, audio);
            }
        }
    }

    setAudioDevice = (audio: HTMLAudioElement, deviceId?: string) => {
        if ((audio as any).setSinkId) {
            try {
                (audio as any).setSinkId(deviceId);
            } catch (e) {
                console.error(e);
            }
        }
    }

    private _wrap = (src: RTCRtpTransceiver) => {
        if (this.transceiverIds.has(src)) {
            let id = this.transceiverIds.get(src)!;
            return this.transeivers.get(id)!;
        } else {
            let id = uuid();
            let res = new AppRtpTransceiverWeb(id, src);
            this.transceiverIds.set(src, id);
            this.transeivers.set(id, res);
            return res;
        }
    }
}

export const AppPeerConnectionFactory: AppPeerConnectionApi = {
    createConnection(configuration: AppPeerConnectionConfiguration) {
        require('webrtc-adapter');
        let peerConnection = new RTCPeerConnection({
            iceServers: configuration.iceServers && configuration.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            iceTransportPolicy: configuration.iceTransportPolicy,
            rtcpMuxPolicy: 'require'
        });
        return new AppPeerConnectionWeb(peerConnection);
    }
};