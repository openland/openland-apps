import { OpenlandClient } from 'openland-api/spacex';
import { backoff } from 'openland-y-utils/timer';
import { MediaConnectionManager } from './MediaConnectionManager';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { ConferenceMediaWatch, ConferenceMediaWatch_media_streams, ConferenceMediaWatch_media_localMedia, ConferenceMedia_conferenceMedia_iceServers } from 'openland-api/spacex.types';
import { AppBackgroundTask } from 'openland-y-runtime/AppBackgroundTask';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ConferenceWatch } from 'openland-api/spacex.types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { InvalidateSync } from '@openland/patterns';
import { MediaSessionState, MediaSessionCommand, reduceState } from './MediaSessionState';
import { Reducer } from 'openland-y-utils/reducer';
import uuid from 'uuid/v4';
import { AppMediaDeviceManager } from 'openland-y-runtime/AppMediaDeviceManager';
import { MediaSessionTrackAnalyzerManager } from './MediaSessionTrackAnalyzer';
import { MediaSessionVolumeSpace } from 'openland-engines/legacy/MediaSessionVolumeSpace';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import sdpTransform from 'sdp-transform';

export class MediaSessionManager {

    // Configuration
    readonly id: string = uuid();
    readonly messenger: MessengerEngine;
    readonly conversationId: string;
    readonly client: OpenlandClient;
    iceServers!: ConferenceMedia_conferenceMedia_iceServers[];

    // Public fields
    onConnected: (() => void) | null = null;
    onDestoy: (() => void) | null = null;
    state: Reducer<MediaSessionState, MediaSessionCommand>;

    // Audio track
    private audioEnabled: boolean;
    private audioTrackPromise?: Promise<AppMediaStreamTrack | null>;
    private audioTrack: AppMediaStreamTrack | null = null;
    private audioDeviceSubscription: (() => void) | undefined;

    // Video track
    private videoEnabled: boolean = false;
    private videoTrackPromise?: Promise<AppMediaStreamTrack | null>;
    private videoTrack: AppMediaStreamTrack | null = null;
    private videoDeviceSubscription: (() => void) | undefined;

    // Screencast track
    private screencastEnabled: boolean = false;
    // private screencastGeneration = 0;
    private screencastTrackPromise?: Promise<AppMediaStreamTrack | null>;
    private screencastTrack: AppMediaStreamTrack | null = null;

    // Transport
    private connectionsSubscription: (() => void) | null = null;
    private connectionsInvalidateSync: InvalidateSync;
    private connections = new Map<string, MediaConnectionManager>();
    private connectionConfigs!: ConferenceMediaWatch_media_streams[];
    private localMediaConfig!: ConferenceMediaWatch_media_localMedia;

    // Analyzer
    public analyzer: MediaSessionTrackAnalyzerManager;

    // Additional media
    public space: MediaSessionVolumeSpace;

    // Lifecycle
    private conferenceId!: string;
    private peerId!: string;
    private kickDetectorSubscription: (() => void) | null = null;
    private ownPeerDetected = false;
    private destroyed = false;

    constructor(messenger: MessengerEngine, conversationId: string) {
        this.messenger = messenger;
        this.client = messenger.client;
        this.conversationId = conversationId;

        // Initial state
        this.audioEnabled = true;
        this.videoEnabled = false;
        this.screencastEnabled = false;

        // Initialize reducer
        this.state = new Reducer(reduceState, {
            sender: {
                id: null,
                audioEnabled: this.audioEnabled,
                videoEnabled: this.videoEnabled,
                screencastEnabled: this.screencastEnabled,

                audioTrack: null,
                videoTrack: null,
                screencastTrack: null
            },
            receivers: {}
        });

        this.analyzer = new MediaSessionTrackAnalyzerManager(this.state);
        this.space = new MediaSessionVolumeSpace(this);

        this.connectionsInvalidateSync = new InvalidateSync(this.handleState);
        this.doInit();
    }

    //
    // Audio
    //

    setAudioEnabled = (audioEnabled: boolean) => {

        // Update State
        this.audioEnabled = audioEnabled;
        this.state.dispatch({ command: 'sender', sender: { audioEnabled } });

        // Update track
        if (this.audioTrack) {
            this.audioTrack.enabled = this.audioEnabled;
        }

        // Update server
        this.reportLocalMediaState();
    }

    //
    // Video
    //

    setVideoEnabled = (videoEnabled: boolean) => {

        // Update state
        this.videoEnabled = videoEnabled;
        this.state.dispatch({ command: 'sender', sender: { videoEnabled } });

        // Update track
        this.doLoadVideoIfNeeded();
        if (this.videoTrack) {
            this.videoTrack.enabled = videoEnabled;
        }

        // Update server
        this.reportLocalMediaState();
    }

    //
    // Screencast
    //

    setScreenshareEnabled = async (screencastEnabled: boolean) => {
        this.screencastEnabled = screencastEnabled;
        this.state.dispatch({ command: 'sender', sender: { screencastEnabled } });
        this.reportLocalMediaState();
    }

    reportLocalMediaState = () => {
        this.client.mutateconferenceRequestLocalMediaChange({
            id: this.conferenceId,
            media: {
                supportsAudio: true,
                supportsVideo: true,
                wantSendAudio: this.audioEnabled,
                wantSendVideo: this.videoEnabled,
                wantSendScreencast: this.screencastEnabled,
            }
        });
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;

        console.log('[WEBRTC] Destroying conference');

        // Destroy streams
        for (let s of this.connections.keys()) {
            this.connections.get(s)!.destroy();
        }

        // unsubscribe from device manager;
        if (this.audioDeviceSubscription) {
            this.audioDeviceSubscription();
        }
        if (this.videoDeviceSubscription) {
            this.videoDeviceSubscription();
        }

        // Stop Tracks
        if (this.audioTrack) {
            this.audioTrack.stop();
            this.audioTrack = null;
        }
        if (this.videoTrack) {
            this.videoTrack.stop();
            this.videoTrack = null;
        }
        if (this.screencastTrack) {
            this.screencastTrack.stop();
            this.screencastTrack = null;
        }

        // Dispose analyzer
        this.analyzer.dispose();

        // Dispose space
        this.space.dispose();

        // Connections invalidate sync
        if (this.connectionsSubscription) {
            this.connectionsSubscription();
            this.connectionsSubscription = null;
        }

        // Kick detector
        if (this.kickDetectorSubscription) {
            this.kickDetectorSubscription();
            this.kickDetectorSubscription = null;
        }

        // Notify about leave
        if (this.conferenceId && this.peerId) {
            backoff(async () => {
                await this.client.mutateConferenceLeave({
                    id: this.conferenceId,
                    peerId: this.peerId
                });
            });
        }
    }

    //
    // Media State
    //

    private startMedia = () => {

        // Request audio
        this.doLoadAudioIfNeeded();

        // Subscribe for media streams
        this.connectionsSubscription = reliableWatcher<ConferenceMediaWatch>((handler) => this.client.subscribeConferenceMediaWatch({ peerId: this.peerId, id: this.conferenceId }, handler), (src) => {
            console.log('[WEBRTC] Update');
            let streams = src.media.streams;
            this.connectionConfigs = streams;
            this.localMediaConfig = src.media.localMedia;
            this.connectionsInvalidateSync.invalidate();
        });
    }

    private handleState = async () => {
        if (this.destroyed) {
            return;
        }
        console.log('[WEBRTC] Apply');

        // Detect deletions
        for (let s of this.connections.keys()) {
            if (!this.connectionConfigs.find((v) => v.id === s)) {
                console.log('[WEBRTC] Destroy stream ' + s);
                let stream = this.connections.get(s);
                this.connections.delete(s);
                if (stream) {
                    stream.destroy();
                }
            }
        }

        // Update or create new
        for (let s of this.connectionConfigs) {
            let ms = this.connections.get(s.id);
            if (ms) {
                console.log('[WEBRTC] Update stream ' + s.id);
                ms.dispatch(s);
            } else {
                console.log('[WEBRTC] Add stream ' + s.id);
                ms = new MediaConnectionManager(s.id, this.peerId, s, this);
                ms.setAudioTrack(this.audioTrack);
                ms.setVideoTrack(this.videoTrack);
                ms.setScreencastTrack(this.screencastTrack);
                this.connections.set(s.id, ms);
            }
        }

        if (this.localMediaConfig.sendScreencast) {
            this.doLoadScreencast();
        } else {
            this.doUnloadScreencast();
        }
    }

    //
    // Lifecycle
    //

    private getCapabilities = async () => {
        let pc = AppPeerConnectionFactory.createConnection({ iceServers: [], iceTransportPolicy: 'all' });
        try {
            pc.addTransceiver('audio');
            pc.addTransceiver('video');
            let sdp = (await pc.createOffer()).sdp;
            let parsed = sdpTransform.parse(sdp);

            // Source:
            // https://github.com/versatica/mediasoup-client/blob/v3/src/handlers/sdp/commonUtils.ts

            let headerExtensions: { kind: string, uri: string, preferredId: number }[] = [];
            let codecs = new Map<number, {
                kind: string,
                mimeType: string,
                preferredPayloadType: number,
                clockRate: number,
                channels?: number,
                parameters: { key: string, value: string }[],
                rtcpFeedback: { type: string, value?: string }[]
            }>();
            for (let m of parsed.media) {
                if (m.ext) {
                    for (let e of m.ext) {
                        if (e['encrypt-uri']) {
                            continue;
                        }
                        headerExtensions.push({
                            kind: m.type,
                            uri: e.uri,
                            preferredId: e.value
                        });
                    }
                }

                // Codecs
                for (const rtp of m.rtp) {
                    const codec = {
                        kind: m.type,
                        mimeType: `${m.type}/${rtp.codec}`,
                        preferredPayloadType: rtp.payload,
                        clockRate: rtp.rate!,
                        channels: rtp.encoding,
                        parameters: [],
                        rtcpFeedback: []
                    };
                    codecs.set(codec.preferredPayloadType, codec);
                }

                // Codecs Parameters
                if (m.fmtp) {
                    for (const fmtp of m.fmtp || []) {
                        const parameters = sdpTransform.parseParams(fmtp.config);
                        const codec = codecs.get(fmtp.payload);
                        if (!codec) {
                            continue;
                        }
                        if (parameters) {
                            for (let k of Object.keys(parameters)) {
                                codec.parameters.push({ key: k, value: String(parameters[k]) });
                            }
                        }
                    }
                }

                // Codecs RTCP feedback
                if (m.rtcpFb) {
                    for (let fb of m.rtcpFb) {
                        const codec = codecs.get(fb.payload);
                        if (!codec) {
                            continue;
                        }
                        const feedback = {
                            type: fb.type,
                            value: fb.subtype
                        };
                        codec.rtcpFeedback.push(feedback);
                    }
                }
            }
            return {
                headerExtensions,
                codecs: [...codecs.values()].map((v) => ({ ...v }))
            };
        } finally {
            pc.close();
        }
    }

    private doInit = () => {
        console.log('[WEBRTC] Starting conference');
        (async () => {

            // Start resolve capabilities
            let rtpCapabilities = backoff(this.getCapabilities);

            // Resolve conference
            let conferenceId = (await backoff(async () => {
                if (this.destroyed) {
                    return null;
                }
                return (await this.client.queryConference({ id: this.conversationId }, { fetchPolicy: 'network-only' })).conference.id;
            }))!;
            if (!conferenceId) {
                return;
            }

            console.log('[WEBRTC] Resolved conference');

            // Joining
            let capabilities = await rtpCapabilities;
            console.log('[WEBRTC] Resolved Capabilities');
            console.log(capabilities);
            let joinConference = (await backoff(async () => {
                if (this.destroyed) {
                    return null;
                }
                return (await this.client.mutateConferenceJoin({
                    id: conferenceId,
                    input: {
                        capabilities,
                        media: { supportsVideo: true, supportsAudio: true, wantSendVideo: false, wantSendAudio: true, wantSendScreencast: false }
                    }
                })).conferenceJoin;
            }))!;
            if (!joinConference) {
                return;
            }

            if (this.destroyed) {
                // Leave from already destroyed session
                backoff(async () => {
                    await this.client.mutateConferenceLeave({
                        id: conferenceId,
                        peerId: joinConference.peerId
                    });
                });
                return null;
            }
            console.log('[WEBRTC] Joined conference');
            this.iceServers = joinConference.conference.iceServers;
            this.conferenceId = conferenceId;
            this.peerId = joinConference.peerId;
            this.state.dispatch({ command: 'sender', sender: { id: this.peerId } });

            // TODO: Reimplement
            // this.onStatusChange(this.isPrivate ? 'waiting' : 'connected', !this.isPrivate ? joinConference.conference.startTime : undefined);

            // Start kick detection
            this.kickDetectorSubscription = reliableWatcher<ConferenceWatch>((handler) => this.client.subscribeConferenceWatch({ id: this.conferenceId }, handler), (src) => {
                let ownPeerDetected = !!(src.alphaConferenceWatch.peers).find(p => p.id === this.peerId);
                if (this.ownPeerDetected && !ownPeerDetected) {
                    this.destroy();
                    if (this.onDestoy) {
                        this.onDestoy();
                    }
                }
                this.ownPeerDetected = ownPeerDetected;
            });

            // Start keep alive
            this.doKeepAlive();

            // Start Media
            this.startMedia();

            return;
        })();
    }

    private doKeepAlive = () => {
        let confId = this.conferenceId;
        let peerId = this.peerId;
        const intervalId = AppBackgroundTask.setInterval(() => {
            // this will be executed once after 10 seconds
            // even when app is the the background
            if (!this.destroyed) {
                console.log('[WEBRTC] Keep Alive sent');
                this.client.mutateConferenceKeepAlive({
                    id: confId,
                    peerId,
                });
            } else {
                AppBackgroundTask.clearInterval(intervalId);
                this.client.mutateConferenceLeave({
                    id: confId,
                    peerId: peerId
                });
            }
        }, 1000);
    }

    //
    // Sender's tracks
    //

    private onAudioTrackLoaded = () => {
        // Update connections
        for (let connection of this.connections.values()) {
            connection.setAudioTrack(this.audioTrack);
        }

        // Update State
        this.state.dispatch({ command: 'sender', sender: { audioTrack: this.audioTrack } });
    }

    private onVideoTrackLoaded = () => {
        // Update connections
        for (let connection of this.connections.values()) {
            connection.setVideoTrack(this.videoTrack);
        }

        // Update State
        this.state.dispatch({ command: 'sender', sender: { videoTrack: this.videoTrack } });
    }

    private onScreencastTrackLoaded = () => {
        // Update connections
        for (let connection of this.connections.values()) {
            connection.setScreencastTrack(this.screencastTrack);
        }

        this.state.dispatch({ command: 'sender', sender: { screencastTrack: this.screencastTrack } });

    }
    private onScreencastTrackUnloaded = () => {
        for (let connection of this.connections.values()) {
            connection.setScreencastTrack(null);
        }
        // Update State
        this.state.dispatch({ command: 'sender', sender: { screencastTrack: null } });
    }

    private async doLoadAudioIfNeeded() {
        if (!this.audioTrackPromise) {
            this.audioTrackPromise = new Promise<AppMediaStreamTrack | null>(resolve => {
                this.audioDeviceSubscription = AppMediaDeviceManager.listenAudioDeviceChange(async deviceId => {
                    if (this.destroyed) {
                        resolve(null);
                    }
                    try {
                        let audio = await AppUserMedia.getUserAudio(deviceId);
                        // Configure audio track
                        audio.enabled = this.audioEnabled;
                        if (this.audioTrack) {
                            this.audioTrack.stop();
                        }
                        // Save audio track
                        this.audioTrack = audio;
                        this.onAudioTrackLoaded();
                        resolve(audio);
                    } catch (e) {
                        console.warn(e);
                        resolve(null);
                    }
                });
            });
        }
        await this.audioTrackPromise;
    }

    private async doLoadVideoIfNeeded() {
        if (!this.videoTrackPromise) {
            this.videoTrackPromise = new Promise<AppMediaStreamTrack | null>(resolve => {
                this.videoDeviceSubscription = AppMediaDeviceManager.listenVideoDeviceChange(async deviceId => {
                    if (this.destroyed) {
                        resolve(null);
                    }
                    try {
                        let video = await AppUserMedia.getUserVideo(deviceId);
                        // Configure video track
                        video.enabled = this.videoEnabled;

                        if (this.videoTrack) {
                            this.videoTrack.stop();
                        }
                        // Save video track
                        this.videoTrack = video;
                        this.onVideoTrackLoaded();
                        resolve(video);
                    } catch (e) {
                        console.warn(e);
                        resolve(null);
                    }
                });
            });
        }
        await this.videoTrackPromise;
    }

    doLoadScreencast() {
        if (!this.screencastTrackPromise) {
            this.screencastTrackPromise = (async () => {
                try {
                    this.screencastTrack = await AppUserMedia.getUserScreen();
                    if (!this.screencastEnabled) {
                        throw new Error('inconsistent state');
                    }
                    this.onScreencastTrackLoaded();
                    return this.screencastTrack;
                } catch (e) {
                    this.screencastTrackPromise = undefined;
                    this.setScreenshareEnabled(false);
                    return null;
                }
            })();
        }
    }

    async doUnloadScreencast() {
        this.screencastEnabled = false;
        this.state.dispatch({ command: 'sender', sender: { screencastEnabled: false } });

        await this.screencastTrackPromise;
        this.screencastTrackPromise = undefined;
        this.screencastTrack?.stop();
        this.onScreencastTrackUnloaded();
    }

    //
    // Collect recievers
    //

    attachPeerReceiver = (peerId: string, type: 'audio' | 'video' | 'screencast', track: AppMediaStreamTrack | null) => {
        let command: MediaSessionCommand = { command: 'receiver', receiver: { id: peerId } };
        if (type === 'audio') {
            command.receiver.audioTrack = track;
        } else if (type === 'video') {
            command.receiver.videoTrack = track;
        } else if (type === 'screencast') {
            command.receiver.screencastTrack = track;
        }
        this.state.dispatch(command);
    }
}