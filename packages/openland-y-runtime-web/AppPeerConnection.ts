import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { AppUserMediaStreamWeb } from './AppUserMedia';
import { randomKey } from 'openland-graphql/utils/randomKey';

export class AppPeerConnectionWeb implements AppPeerConnection {
    private id = randomKey();
    private connection: RTCPeerConnection;
    private audio?: HTMLAudioElement;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;
    onnegotiationneeded: (() => void) | undefined = undefined;
    oniceconnectionstatechange: ((ev: { target: { iceConnectionState?: string | 'failed' } }) => void) | undefined = undefined;
    onStreamAdded: ((stream: AppMediaStream) => void) | undefined;

    private streams = new Set<MediaStream>();

    private trackSenders = new Map<MediaStreamTrack, RTCRtpSender>();

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev) => this.started && this.onicecandidate && this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });

        this.connection.ontrack = (ev) => {
            console.warn(ev.track);
            if (!this.started) {
                return;
            }

            if (ev.track.kind === 'audio') {
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

            }

            for (let stream of ev.streams) {
                if (!this.streams.has(stream)) {
                    this.streams.add(stream);
                    if (this.onStreamAdded) {
                        this.onStreamAdded(new AppUserMediaStreamWeb(stream));
                    }
                }
            }

        };

        this.connection.onnegotiationneeded = () => this.onnegotiationneeded && this.onnegotiationneeded();
        this.connection.oniceconnectionstatechange = (ev) => this.oniceconnectionstatechange && ev && ev.target && this.oniceconnectionstatechange(ev as any);

        // let audio = new Audio();
        // audio.autoplay = true;
        // audio.setAttribute('playsinline', 'true');
        // audio.controls = false;
        // audio.srcObject = ev.streams[0];
        // audio.load();
        // audio.play();
    }

    createOffer = async () => {
        console.log('[PC:' + this.id + '] createOffer');
        return JSON.stringify(await this.connection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true } as any /* WTF with typings? */));
    }

    setLocalDescription = async (sdp: string) => {
        console.log('[PC:' + this.id + '] setLocalDescription');
        console.log('[PC:' + this.id + ']', sdp);
        await this.connection.setLocalDescription(JSON.parse(sdp));
    }

    setRemoteDescription = async (sdp: string) => {
        console.log('[PC:' + this.id + '] setRemoteDescription');
        console.log('[PC:' + this.id + ']', sdp);
        await this.connection.setRemoteDescription(JSON.parse(sdp));
    }

    createAnswer = async () => {
        console.log('[PC:' + this.id + '] createAnswer');
        return JSON.stringify(await this.connection.createAnswer({ offerToReceiveAudio: true, offerToReceiveVideo: true } as any /* WTF with typings? */));
    }

    addStream = (stream: AppMediaStream) => {
        let str = (stream as AppUserMediaStreamWeb)._stream;
        for (let t of str.getTracks()) {
            let sender = this.trackSenders.get(t);
            if (sender) {
                this.connection.removeTrack(sender);
            }
            this.connection.addTrack(t, str);
        }
    }

    addIceCandidate = (candidate: string) => {
        return this.connection.addIceCandidate(JSON.parse(candidate));
    }

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
        this.streams.forEach(s => s.getTracks().forEach(t => t.stop()));
    }

    getConnection = () => {
        return this.connection;
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