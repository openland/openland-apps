import { AppPeerConnectionApi, AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';
import { AppUserMediaTrackWeb } from './AppUserMedia';
import { randomKey } from 'openland-y-utils/randomKey';
// import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';

export class AppPeerConnectionWeb implements AppPeerConnection {
    private id = randomKey();
    private connection: RTCPeerConnection;
    private audio?: HTMLAudioElement;
    private started = true;

    onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;
    onnegotiationneeded: (() => void) | undefined = undefined;
    oniceconnectionstatechange: ((ev: { target: { iceConnectionState?: string | 'failed' } }) => void) | undefined = undefined;
    ontrackadded: ((stream: AppMediaStreamTrack) => void) | undefined;
    onAudioInputChanged?: ((deviceId: string) => void) | undefined;

    private trackSenders = new Map<string, RTCRtpSender>();

    private audioOutputDevice: MediaDeviceInfo | undefined;

    private dataChannels = new Map<number, RTCDataChannel>();
    private volume?: number;

    // private d1: () => void;
    // private d2: () => void;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev) => this.started && this.onicecandidate && this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });

        // this.d2 = MediaDevicesManager.instance().listenOutputDevice(d => {
        //     if (d !== this.audioOutputDevice) {
        //         this.audioOutputDevice = d;
        //         // TODO how to do it in safari?
        //         if (this.audio && (this.audio as any).setSinkId) {
        //             (this.audio as any).setSinkId(this.audioOutputDevice?.deviceId);
        //         }
        //     }
        // });

        // this.d1 = MediaDevicesManager.instance().listenStreamUpdated(s => {
        //     // this.addStream(s);
        // });

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
                if ((this.audio as any).setSinkId) {
                    (this.audio as any).setSinkId(this.audioOutputDevice?.deviceId);
                }
                if (this.volume) {
                    this.audio.volume = this.volume;
                }

                this.audio.autoplay = true;
                this.audio.setAttribute('playsinline', 'true');
                this.audio.controls = false;
                this.audio.srcObject = ev.streams[0];
                this.audio.load();
                this.audio.play();
            }

            if (this.ontrackadded) {
                this.ontrackadded(new AppUserMediaTrackWeb(ev.track));
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

    setVolume = (volume: number) => {
        this.volume = volume;
        if (this.audio) {
            this.audio.volume = volume;
        }
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

    addTrack = (track: AppMediaStreamTrack) => {
        this.removeTrack(track); // WTF?
        let rawTrack = (track as AppUserMediaTrackWeb).track;
        let sender = this.connection.addTrack(rawTrack);
        this.trackSenders.set(track.id, sender);
    }

    removeTrack = (track: AppMediaStreamTrack) => {
        let rawTrack: MediaStreamTrack = (track as AppUserMediaTrackWeb).track;
        let sender = this.trackSenders.get(rawTrack.id);
        if (sender) {
            this.trackSenders.delete(rawTrack.id);
            this.connection.removeTrack(sender);
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
        for (let dc of this.dataChannels.values()) {
            dc.close();
        }
        // this.d1();
        // this.d2();
        this.connection.close();
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