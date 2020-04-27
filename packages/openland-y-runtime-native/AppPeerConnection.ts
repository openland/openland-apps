import { AppPeerTransceiverParams, AppRtpSender, AppRtpReceiver, AppRtpTransceiver } from './../openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { AppUserMediaStreamTrackNative } from './AppUserMedia';

export class AppRtpReceiverNative implements AppRtpReceiver {
    raw: any;
    readonly track: AppUserMediaStreamTrackNative;

    constructor(raw: any) {
        this.raw = raw;
        this.track = new AppUserMediaStreamTrackNative(raw.track);
    }
}

export class AppRtpSenderNative implements AppRtpSender {
    raw: any;

    constructor(raw: RTCRtpSender) {
        this.raw = raw;
    }

    replaceTrack(track: AppMediaStreamTrack | null) {
        if (track) {
            let rawTrack = (track as AppUserMediaStreamTrackNative).track;
            this.raw.replaceTrack(rawTrack);
        } else {
            this.raw.replaceTrack(null);
        }
    }
}

export class AppRtpTransceiverNative implements AppRtpTransceiver {

    raw: any;
    readonly id: string;
    readonly sender: AppRtpSender;
    readonly receiver: AppRtpReceiver;

    constructor(id: string, raw: RTCRtpTransceiver) {
        this.raw = raw;
        this.id = id;
        this.sender = new AppRtpSenderNative(raw.sender);
        this.receiver = new AppRtpReceiverNative(raw.receiver);
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

class AppPeerConnectionNative implements AppPeerConnection {

    private connection: RTCPeerConnection;
    private started = true;
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev: any) => {
            if (!this.started) {
                return;
            }
            if (this.onicecandidate) {
                this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });
            }
        };
    }

    addIceCandidate = async (candidate: string) => {
        await this.connection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
    }

    createOffer = async () => {
        return JSON.stringify(await this.connection.createOffer());
    }

    setLocalDescription = async (sdp: string) => {
        await this.connection.setLocalDescription(new RTCSessionDescription(JSON.parse(sdp)));
    }

    setRemoteDescription = async (sdp: string) => {
        await this.connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(sdp)));
    }

    createAnswer = async () => {
        return JSON.stringify(await this.connection.createAnswer());
    }

    addTranseiver = async (arg: 'audio' | 'video' | AppMediaStreamTrack, params?: AppPeerTransceiverParams) => {
        let transceiver: any;
        if (arg === 'audio') {
            transceiver = await (this.connection as any).addTransceiver('audio', params);
        } else if (arg === 'video') {
            transceiver = await (this.connection as any).addTransceiver('video', params);
        } else {
            let track = (arg as AppUserMediaStreamTrackNative).track;
            transceiver = await (this.connection as any).addTransceiver(track, params);
        }
        let res = new AppRtpTransceiverNative(transceiver.receiver.track.id, transceiver);
        // this.transeivers.set(res.id, res);
        return res;
    }

    //
    // Shutdown
    //

    close() {
        if (!this.started) {
            return;
        }
        this.started = false;
        // this.#trackStreams.clear();
        this.connection.close();
    }
}

export const AppPeerConnectionFactory: AppPeerConnectionApi = {
    createConnection(configuration: AppPeerConnectionConfiguration) {
        let peerConnection = new RTCPeerConnection({
            iceServers: configuration.iceServers ? configuration.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })) : [],
            iceTransportPolicy: configuration.iceTransportPolicy,
        });
        return new AppPeerConnectionNative(peerConnection);
    }
};