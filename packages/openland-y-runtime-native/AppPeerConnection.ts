import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, EventOnAddStream, EventOnConnectionStateChange } from 'react-native-webrtc';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { AppUserMediaStreamNative } from './AppUserMedia';

class AppPeerConnectionNative implements AppPeerConnection {

    private connection: RTCPeerConnection;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;
    onnegotiationneeded: (() => void) | undefined;
    oniceconnectionstatechange: ((ev: { target?: { iceConnectionState?: string | 'failed' } }) => void) | undefined = undefined;
    onStreamAdded: ((stream: AppMediaStream) => void) | undefined;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev: any) => (this.started && this.onicecandidate) ? this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined }) : undefined;
        this.connection.onnegotiationneeded = () => this.onnegotiationneeded && this.onnegotiationneeded();
        this.connection.oniceconnectionstatechange = (ev: EventOnConnectionStateChange) => this.oniceconnectionstatechange && ev && ev.target && this.oniceconnectionstatechange(ev);
        this.connection.onaddstream = (ev: EventOnAddStream) => {
            if (this.onStreamAdded) {
                console.warn('[webrtc]', 'onaddstream', ev.stream.toURL());
                this.onStreamAdded(new AppUserMediaStreamNative(ev.stream));
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