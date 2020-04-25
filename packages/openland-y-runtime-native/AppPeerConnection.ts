import { AppUserMediaStreamTrackNative } from './AppUserMedia';
import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, EventOnAddStream, MediaStream } from 'react-native-webrtc';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';

class AppPeerConnectionNative implements AppPeerConnection {

    private connection: RTCPeerConnection;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;
    ontrackadded: ((stream: AppMediaStreamTrack) => void) | undefined;

    #trackStreams = new Map<string, MediaStream>();

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev: any) => (this.started && this.onicecandidate) ? this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined }) : undefined;
        this.connection.onaddstream = (ev: EventOnAddStream) => {
            if (!this.started) {
                return;
            }
            console.warn('[webrtc]', 'Received new stream ' + ev.stream.id);
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
        // this.connection.onremovestream = ((ev: { stream: MediaStream } /* Typings are wrong */) => {
        //     if (!this.started) {
        //         return;
        //     }
        //     console.warn('[webrtc]', 'Stream was removed: ' + ev.stream.id);
        //     // if (!this.#currentStreams.has(ev.stream.id)) {
        //     //     this.#currentStreams.delete(ev.stream.id);
        //     // }
        // }) as any;
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

    addTrack = (track: AppMediaStreamTrack) => {
        this.removeTrack(track); // WTF?
        let rawTrack = (track as AppUserMediaStreamTrackNative).track;
        let stream = new MediaStream(undefined);
        stream.addTrack(rawTrack);
        this.connection.addStream(stream);
        this.#trackStreams.set(track.id, stream);
    }

    removeTrack = (track: AppMediaStreamTrack) => {
        let stream = this.#trackStreams.get(track.id);
        if (stream) {
            this.connection.removeStream(stream);
        }
    }

    //
    // Shutdown
    //

    close() {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.#trackStreams.clear();
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