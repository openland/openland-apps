import { AppUserMediaStreamTrackNative } from './AppUserMedia';
import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, EventOnAddStream, EventOnConnectionStateChange, MediaStream } from 'react-native-webrtc';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';

class AppPeerConnectionNative implements AppPeerConnection {

    private connection: RTCPeerConnection;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;
    onnegotiationneeded: (() => void) | undefined;
    oniceconnectionstatechange: ((ev: { target?: { iceConnectionState?: string | 'failed' } }) => void) | undefined = undefined;
    ontrackadded: ((stream: AppMediaStreamTrack) => void) | undefined;

    #currentStreams = new Map<string, MediaStream>();

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev: any) => (this.started && this.onicecandidate) ? this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined }) : undefined;
        this.connection.onnegotiationneeded = () => this.onnegotiationneeded && this.onnegotiationneeded();
        this.connection.oniceconnectionstatechange = (ev: EventOnConnectionStateChange) => this.oniceconnectionstatechange && ev && ev.target && this.oniceconnectionstatechange(ev);
        this.connection.onaddstream = (ev: EventOnAddStream) => {
            if (!this.started) {
                return;
            }
            console.warn('[webrtc]', 'Received new stream ' + ev.stream.id);
            if (this.#currentStreams.has(ev.stream.id)) {
                console.warn('[webrtc]', 'Unexpected second stream!');
                return;
            }
            this.#currentStreams.set(ev.stream.id, ev.stream);
            if (this.ontrackadded) {
                console.warn('[webrtc]', 'onaddstream', ev.stream.toURL());
                for (let t of ev.stream.getAudioTracks()) {
                    this.ontrackadded(new AppUserMediaStreamTrackNative(t));
                }
                for (let t of ev.stream.getVideoTracks()) {
                    this.ontrackadded(new AppUserMediaStreamTrackNative(t));
                }
            }
        };
        this.connection.onremovestream = ((ev: { stream: MediaStream } /* Typings are wrong */) => {
            if (!this.started) {
                return;
            }
            console.warn('[webrtc]', 'Stream was removed: ' + ev.stream.id);
            if (!this.#currentStreams.has(ev.stream.id)) {
                this.#currentStreams.delete(ev.stream.id);
            }
        }) as any;
    }

    addIceCandidate = async (candidate: string) => {
        await this.connection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
    }

    createOffer = async () => {
        return JSON.stringify(await (this.connection as any).createOffer());
    }

    setLocalDescription = async (sdp: string) => {
        await this.connection.setLocalDescription(new RTCSessionDescription(JSON.parse(sdp)));
    }

    setRemoteDescription = async (sdp: string) => {
        await this.connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(sdp)));
    }

    createAnswer = async () => {
        return JSON.stringify(await (this.connection as any).createAnswer());
    }

    setVolume = (volume: number) => {
        // not implemented yet
    }

    // 
    // Streams
    //

    addTrack = (stream: AppMediaStream) => {
        let s = (stream as AppUserMediaStreamNative)._stream;
        if (s.getAudioTracks().length) {
            if (this.audioStream) {
                this.connection.removeStream(this.audioStream);
            }
            this.audioStream = s;
        }
        if (s.getVideoTracks().length) {
            if (this.videoStream) {
                this.connection.removeStream(this.videoStream);
            }
            this.videoStream = s;
        }
        this.connection.addStream(s);
    }

    removeTrack = (stream: AppMediaStream) => {
        let s = (stream as AppUserMediaStreamNative)._stream;
        this.connection.removeStream(s);
    }

    //
    // Shutdown
    //

    close() {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.#currentStreams.clear();
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