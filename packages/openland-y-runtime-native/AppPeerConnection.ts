import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

class AppPeerConnectionNative implements AppPeerConnection {

    private connection: any;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;
    onnegotiationneeded: (() => void) | undefined = undefined;
    oniceconnectionstatechange: ((ev: { target?: { iceConnectionState?: string | 'failed' } }) => void) | undefined = undefined;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev: any) => this.started && this.onicecandidate && this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });
        this.connection.onnegotiationneeded = () => this.onnegotiationneeded && this.onnegotiationneeded();
        this.connection.oniceconnectionstatechange = (ev: any) => this.oniceconnectionstatechange && ev && ev.target && this.oniceconnectionstatechange(ev);
    }

    addIceCandidate = async (candidate: string) => {
        await this.connection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
    }

    createOffer = async () => {
        return JSON.stringify(await this.connection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: false } as any /* WTF with typings? */));
    }

    setLocalDescription = async (sdp: string) => {
        await this.connection.setLocalDescription(new RTCSessionDescription(JSON.parse(sdp)));
    }

    setRemoteDescription = async (sdp: string) => {
        await this.connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(sdp)));
    }

    createAnswer = async () => {
        return JSON.stringify(await this.connection.createAnswer({ offerToReceiveAudio: true, offerToReceiveVideo: false } as any /* WTF with typings? */));
    }

    addStream = (stream: AppMediaStream) => {
        this.connection.addStream((stream as any)._stream);
    }

    close() {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.connection.close();
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
        })
        return new AppPeerConnectionNative(peerConnection);
    }
};