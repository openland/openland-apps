import { OpenlandClient } from 'openland-api/spacex';
import { backoff } from 'openland-y-utils/timer';
import { MediaConnectionManager } from './MediaConnectionManager';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { ConferenceMediaWatch, ConferenceMediaWatch_media_streams, ConferenceMedia_conferenceMedia_iceServers } from 'openland-api/spacex.types';
import { AppBackgroundTask } from 'openland-y-runtime/AppBackgroundTask';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ConferenceWatch } from 'openland-api/spacex.types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { InvalidateSync } from '@openland/patterns';
import { MediaSessionState, MediaSessionCommand, reduceState } from './MediaSessionState';
import { Reducer } from 'openland-y-utils/reducer';
import uuid from 'uuid/v4';

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

    // Video track
    private videoEnabled: boolean = false;
    private videoTrackPromise?: Promise<AppMediaStreamTrack | null>;
    private videoTrack: AppMediaStreamTrack | null = null;

    // Screencast track
    private screencastEnabled: boolean = false;
    // private screencastGeneration = 0;
    // private screencastTrackPromise?: Promise<AppMediaStreamTrack | null>;
    private screencastTrack: AppMediaStreamTrack | null = null;

    // Transport
    private connectionsSubscription: (() => void) | null = null;
    private connectionsInvalidateSync: InvalidateSync;
    private connections = new Map<string, MediaConnectionManager>();
    private connectionConfigs!: ConferenceMediaWatch_media_streams[];

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

    startScreenShare = async () => {
        // TODO: Implement
    }

    stopScreenShare = async () => {
        // TODO: Implement
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
    }

    //
    // Lifecycle
    //

    private doInit = () => {
        console.log('[WEBRTC] Starting conference');
        (async () => {
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
            let joinConference = (await backoff(async () => {
                if (this.destroyed) {
                    return null;
                }
                return (await this.client.mutateConferenceJoin({ id: conferenceId })).conferenceJoin;
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

    // private onScreencastTrackLoaded = () => {
    //     // TODO: Handle
    //     // Update connections
    //     for (let connection of this.connections.values()) {
    //         connection.setScreencastTrack(this.screencastTrack);
    //     }
    // }
    // private onScreencastTrackUnloaded = () => {
    //     // TODO: Handle
    //     for (let connection of this.connections.values()) {
    //         connection.setScreencastTrack(null);
    //     }
    // }

    private async doLoadAudioIfNeeded() {
        if (!this.audioTrackPromise) {
            this.audioTrackPromise = (async () => {
                try {
                    let audio = await AppUserMedia.getUserAudio();
                    if (this.destroyed) {
                        return null;
                    }

                    // Configure audio track
                    audio.enabled = this.audioEnabled;

                    // Save audio track
                    this.audioTrack = audio;
                    this.onAudioTrackLoaded();
                    return audio;
                } catch (e) {
                    console.warn(e);
                }
                return null;
            })();
        }
        await this.audioTrackPromise;
    }

    private async doLoadVideoIfNeeded() {
        if (!this.videoTrackPromise) {
            this.videoTrackPromise = (async () => {
                try {
                    let video = await AppUserMedia.getUserVideo();
                    if (this.destroyed) {
                        return null;
                    }

                    // Configure video track
                    video.enabled = this.videoEnabled;

                    // Save video track
                    this.videoTrack = video;
                    this.onVideoTrackLoaded();
                    return video;
                } catch (e) {
                    console.warn(e);
                }
                return null;
            })();
        }
        await this.videoTrackPromise;
    }

    //
    // Collect recievers
    //

    onReceiverAdded = (peerId: string, type: 'audio' | 'video' | 'screencast', track: AppMediaStreamTrack) => {
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