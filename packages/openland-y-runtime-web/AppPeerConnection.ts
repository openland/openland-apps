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
    onDcMessage: ((message: any) => void) | undefined;

    private streams = new Set<MediaStream>();
    private trackSenders = new Map<MediaStreamTrack, RTCRtpSender>();

    private audioOutputDevice: MediaDeviceInfo | undefined;

    channel?: RTCDataChannel;
    private volume?: number;

    private d1: () => void;
    private d2: () => void;

    constructor(connection: RTCPeerConnection) {
        this.connection = connection;
        this.connection.onicecandidate = (ev) => this.started && this.onicecandidate && this.onicecandidate({ candidate: ev.candidate ? JSON.stringify(ev.candidate) : undefined });

        this.d2 = MediaDevicesManager.instance().listenOutputDevice(d => {
            if (d !== this.audioOutputDevice) {
                this.audioOutputDevice = d;
                // TODO how to do it in safari?
                if (this.audio && (this.audio as any).setSinkId) {
                    (this.audio as any).setSinkId(this.audioOutputDevice?.deviceId);
                }
            }
        });

        this.d1 = MediaDevicesManager.instance().listenStreamUpdated(s => {
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

        let dc = this.connection.createDataChannel('main', { ordered: true });
        this.handleDataChannel(dc);
        this.connection.ondatachannel = (ev => this.handleDataChannel(ev.channel));
        // let audio = new Audio();
        // audio.autoplay = true;
        // audio.setAttribute('playsinline', 'true');
        // audio.controls = false;
        // audio.srcObject = ev.streams[0];
        // audio.load();
        // audio.play();
    }

    handleDataChannel = (channel: RTCDataChannel) => {
        this.channel = channel;
        channel.onmessage = (ev) => {
            if (this.onDcMessage) {
                this.onDcMessage(ev.data);
            }
        };
    }

    sendDCMessage = (message: string) => {
        if (this.channel?.readyState === 'open') {
            // it can crash on send event if state is open, wtf?
            try {
                this.channel.send(message);
            } catch (e) {
                console.error(e);
            }
        }
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

    hasVideo = false;
    hasAudio = false;
    addStream = (stream: AppMediaStream) => {
        let str = (stream as AppUserMediaStreamWeb)._stream;
        for (let t of str.getTracks()) {
            // ensure track removed;
            let sender = this.trackSenders.get(t);
            if (sender) {
                this.connection.removeTrack(sender);
            }
        }
        let videoAdded = false;
        let audioAdded = false;
        let tracks = str.getTracks();
        for (let sender of this.connection.getSenders()) {
            for (let i = tracks.length - 1; i >= 0; i--) {
                let track = tracks[i];
                if (sender.track?.kind === track.kind) {
                    sender.replaceTrack(track);
                    this.trackSenders.set(track, sender);
                    tracks.splice(i, 1);
                }
                videoAdded = (!this.hasVideo && track.kind === 'video') || videoAdded;
                audioAdded = (!this.hasAudio && track.kind === 'audio') || audioAdded;
                this.hasVideo = videoAdded || this.hasVideo;
                this.hasAudio = audioAdded || this.hasAudio;
            }
        }
        tracks.map(track => this.trackSenders.set(track, this.connection.addTrack(track, str)));
        // wtf time!
        // onnegotiationneeded is not called on turn video on if it's mobile on other side 
        // looks like offer from mobile does not contain offerToReceiveVideo, even thow it is set explisetly
        // so, let's help browser detect enviroment has changed
        if ((videoAdded || audioAdded) && this.onnegotiationneeded) {
            this.onnegotiationneeded();
        }
    }

    removeStream = (stream: AppMediaStream) => {
        let str = (stream as AppUserMediaStreamWeb)._stream;
        for (let t of str.getTracks()) {
            let sender = this.trackSenders.get(t);
            if (sender) {
                this.connection.removeTrack(sender);
            }
            this.trackSenders.delete(t);
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
        this.streams.forEach(s => s.getTracks().forEach(t => t.stop()));
        this.channel?.close();
        this.d1();
        this.d2();
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