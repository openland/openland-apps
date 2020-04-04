import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { AppUserMediaStreamWeb } from './AppUserMedia';
import { randomKey } from 'openland-y-utils/randomKey';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

export class AppPeerConnectionWeb implements AppPeerConnection {
    private id = randomKey();
    private connection: RTCPeerConnection;
    private audio?: HTMLAudioElement;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;
    onnegotiationneeded: (() => void) | undefined = undefined;
    oniceconnectionstatechange: ((ev: { target: { iceConnectionState?: string | 'failed' } }) => void) | undefined = undefined;
    onStreamAdded: ((stream: AppMediaStream) => void) | undefined;
    onAudioInputChanged?: ((deviceId: string) => void) | undefined;

    private streams = new Set<MediaStream>();

    private trackSenders = new Map<MediaStreamTrack, RTCRtpSender>();

    private audioOutputDevice: MediaDeviceInfo | undefined;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev) => this.started && this.onicecandidate && this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });

        MediaDevicesManager.instance().listenOutputDevice(d => {
            if (d !== this.audioOutputDevice) {
                this.audioOutputDevice = d;
                if (this.audio) {
                    (this.audio as any).setSinkId(this.audioOutputDevice?.deviceId);
                }
            }
        });

        MediaDevicesManager.instance().listenStreamUpdated(s => {
            this.addStream(s);
        });

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
                (this.audio as any).setSinkId(this.audioOutputDevice?.deviceId);
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
        if (str.getAudioTracks().length) {
            MediaDevicesManager.instance().setAudioOutputStream(stream);
        }
        for (let t of str.getTracks()) {
            // ensure track removed;
            let sender = this.trackSenders.get(t);
            if (sender) {
                this.connection.removeTrack(sender);
            }
        }
        let tracks = str.getTracks();
        for (let sender of this.connection.getSenders()) {
            for (let i = tracks.length - 1; i >= 0; i--) {
                let track = tracks[i];
                console.warn(sender.track, track);
                if (sender.track?.kind === track.kind) {
                    sender.replaceTrack(track);
                    this.trackSenders.set(track, sender);
                    tracks.splice(i, 1);
                }
            }
        }
        tracks.map(track => this.trackSenders.set(track, this.connection.addTrack(track, str)));
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