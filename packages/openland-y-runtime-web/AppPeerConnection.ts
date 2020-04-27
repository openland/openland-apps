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
import { AppUserMediaTrackWeb } from './AppUserMedia';
import { randomKey } from 'openland-y-utils/randomKey';
// import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

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
    private id = randomKey();
    private connection: RTCPeerConnection;
    private started = true;
    private audioTracks = new Map<string, HTMLAudioElement>();
    private transeivers = new Map<string, AppRtpTransceiverWeb>();

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
        let res = new AppRtpTransceiverWeb(transceiver.receiver.track.id, transceiver);
        this.transeivers.set(res.id, res);
        return res;
    }

    getTransceivers() {
        return [...this.transeivers.values()];
    }

    createOffer = async () => {
        console.log('[PC:' + this.id + '] createOffer');
        let res = await this.connection.createOffer();
        return {
            type: res.type! as 'offer',
            sdp: res.sdp!
        };
    }

    setLocalDescription = async (sdp: AppSessionDescription) => {
        console.log('[PC:' + this.id + '] setLocalDescription');
        console.log('[PC:' + this.id + ']', sdp.sdp);
        await this.connection.setLocalDescription(sdp);
        this._applyTranseivers();
    }

    setRemoteDescription = async (sdp: AppSessionDescription) => {
        console.log('[PC:' + this.id + '] setRemoteDescription');
        console.log('[PC:' + this.id + ']', sdp.sdp);
        await this.connection.setRemoteDescription(sdp);
        this._applyTranseivers();
    }

    createAnswer = async () => {
        console.log('[PC:' + this.id + '] createAnswer');
        let res = await this.connection.createAnswer({ offerToReceiveAudio: true, offerToReceiveVideo: true } as any /* WTF with typings? */);
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
            if (this.transeivers.has(t.receiver.track.id)) {
                continue;
            }
            this.transeivers.set(t.receiver.track.id, new AppRtpTransceiverWeb(t.receiver.track.id, t));
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

        for (let t of this.connection.getTransceivers()) {
            if (t.receiver.track.kind === 'audio') {
                if (this.audioTracks.has(t.receiver.track.id)) {
                    continue;
                } else {
                    let audio = new Audio();
                    let stream = new MediaStream();
                    stream.addTrack(t.receiver.track);
                    audio.autoplay = true;
                    audio.setAttribute('playsinline', 'true');
                    audio.controls = false;
                    audio.srcObject = stream;
                    audio.load();
                    audio.play();
                    this.audioTracks.set(t.receiver.track.id, audio);
                }
            }
        }
    }
}

export const AppPeerConnectionFactory: AppPeerConnectionApi = {
    createConnection(configuration: AppPeerConnectionConfiguration) {
        let peerConnection = new RTCPeerConnection({
            iceServers: configuration.iceServers && configuration.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            iceTransportPolicy: configuration.iceTransportPolicy,
        });
        return new AppPeerConnectionWeb(peerConnection);
    }
};