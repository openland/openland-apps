import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { AppUserMediaStreamWeb } from './AppUserMedia';

class AppPeerConnectionWeb implements AppPeerConnection {
    private connection: RTCPeerConnection;
    private audio?: any;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev) => this.started && this.onicecandidate && this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });

        (this.connection as any).ontrack = (ev: any) => {
            if (!this.started) {
                return;
            }

            // Remove existing
            if (this.audio) {
                this.audio.pause();
                this.audio = undefined;
            }

            // Create audio object and play stream
            this.audio = new Audio();
            this.audio.autoplay = true;
            this.audio.setAttribute('playsinline', 'true');
            this.audio.controls = false;
            this.audio.srcObject = ev.streams[0];
            this.audio.load();
            this.audio.play();
        };

        // let audio = new Audio();
        // audio.autoplay = true;
        // audio.setAttribute('playsinline', 'true');
        // audio.controls = false;
        // audio.srcObject = ev.streams[0];
        // audio.load();
        // audio.play();
    }

    createOffer = async () => {
        return JSON.stringify(await this.connection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: false } as any /* WTF with typings? */));
    }

    setLocalDescription = async (sdp: string) => {
        await this.connection.setLocalDescription(JSON.parse(sdp));
    }

    setRemoteDescription = async (sdp: string) => {
        await this.connection.setRemoteDescription(JSON.parse(sdp));
    }

    createAnswer = async () => {
        return JSON.stringify(await this.connection.createAnswer({ offerToReceiveAudio: true, offerToReceiveVideo: false } as any /* WTF with typings? */));
    }

    addStream = (stream: AppMediaStream) => {
        let str = (stream as AppUserMediaStreamWeb)._stream;
        for (let t of str.getTracks()) {
            (this.connection as any).addTrack(t, str);
        }
    }

    addIceCandidate = (candidate: string) => {
        return this.connection.addIceCandidate(JSON.parse(candidate));
    };

    close = () => {
        if (!this.started) {
            return;
        }
        this.started = false;
        if (this.audio) {
            this.audio.pause();
            this.audio = undefined;
        }
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
        return new AppPeerConnectionWeb(peerConnection);
    }
};