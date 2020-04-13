import { OpenlandClient } from 'openland-api/spacex';
import { backoff } from 'openland-y-utils/timer';
import { MediaStreamManager } from './MediaStreamManager';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { ConferenceMediaWatch, ConferenceMediaWatch_media_streams, ConferenceMediaWatch_media_streams_mediaState } from 'openland-api/spacex.types';
import { AppBackgroundTask } from 'openland-y-runtime/AppBackgroundTask';
import { Queue } from 'openland-y-utils/Queue';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ConferenceWatch } from 'openland-api/spacex.types';
import { MediaStreamsAlalizer } from './MediaStreamsAlalizer';
import { MediaSessionVolumeSpace } from './MediaSessionVolumeSpace';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { VMMap, VM, VMSetMap, VMMapMap } from 'openland-y-utils/mvvm/vm';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

export class MediaSessionManager {
    private messenger: MessengerEngine;
    readonly conversationId: string;
    private readonly client: OpenlandClient;
    private readonly onStatusChange: (status: 'waiting' | 'connected', startTime?: number) => void;
    private readonly onDestroyRequested: () => void;
    private mediaStream!: AppMediaStream;
    private outVideoStream?: AppMediaStream;
    private outScreenStream?: AppMediaStream & { binded?: boolean };
    private streamConfigs!: ConferenceMediaWatch_media_streams[];
    private iceServers!: any[];
    private conferenceId!: string;
    private peerId!: string;
    private destroyed = false;
    private mute: boolean;
    private isPrivate: boolean;
    private ownPeerDetected = false;
    readonly analizer: MediaStreamsAlalizer;
    readonly volumeSpace: MediaSessionVolumeSpace;

    readonly streamsVM = new VMMap<string, MediaStreamManager>();
    readonly peerStreamMediaStateVM = new VMMapMap<string, string, ConferenceMediaWatch_media_streams_mediaState>();
    readonly peerVideoVM = new VMSetMap<string, AppMediaStream>();
    readonly peerMediStateVM = new VMSetMap<string, AppMediaStream>();
    readonly dcVM = new VM<{ peerId: string, data: any }>();
    readonly videoEnabledVM = new VM<boolean>();
    readonly outVideoVM = new VM<(AppMediaStream | undefined)[]>();

    constructor(messenger: MessengerEngine, client: OpenlandClient, conversationId: string, mute: boolean, isPrivate: boolean, onStatusChange: (status: 'waiting' | 'connected', startTime?: number) => void, onDestroyRequested: () => void, onVideoEnabled: () => void) {
        this.messenger = messenger;
        this.client = client;
        this.conversationId = conversationId;
        this.mute = mute;
        this.onStatusChange = onStatusChange;
        this.onDestroyRequested = onDestroyRequested;
        this.isPrivate = isPrivate;
        this.doInit();
        this.analizer = new MediaStreamsAlalizer(this);
        this.volumeSpace = new MediaSessionVolumeSpace(this.messenger, this);
        this.videoEnabledVM.listen(onVideoEnabled);
    }

    setMute = (mute: boolean) => {
        this.mute = mute;
        if (this.mediaStream) {
            this.mediaStream.muted = mute;
        }
        backoff(async () => {
            await this.client.mutateconferenceAlterMediaState({
                id: this.conferenceId,
                state: {
                    audioOut: !mute
                }
            });
        });
    }

    startScreenShare = async () => {
        if (!this.outScreenStream) {
            try {
                this.outScreenStream = await AppUserMedia.getUserScreen();
                this.outScreenStream.source = 'screen_share';
            } catch (e) {
                // ignore
            }
        }
        if (!this.outScreenStream) {
            return;
        }
        backoff(async () => {
            await this.client.mutateconferenceAddScreenShare({
                id: this.conferenceId,
            });
        });
        this.outScreenStream.blinded = false;
        this.handleState();
        this.videoEnabledVM.set(true);
        this.outVideoVM.set([this.outVideoStream, this.outScreenStream]);
        return this.outScreenStream;
    }

    stopScreenShare = async () => {
        backoff(async () => {
            await this.client.mutateconferenceRemoveScreenShare({
                id: this.conferenceId,
            });
        });
        if (this.outScreenStream) {
            this.outScreenStream.blinded = true;
            this.outScreenStream.close();
            this.outScreenStream = undefined;
        }
        this.outVideoVM.set([this.outVideoStream, this.outScreenStream]);
        return undefined;
    }

    startVideo = async () => {
        if (!this.outVideoStream) {
            this.outVideoStream = await AppUserMedia.getUserVideo();
            this.outVideoStream.source = 'camera';
        }
        this.outVideoStream.blinded = false;
        this.outVideoVM.set([this.outVideoStream, this.outScreenStream]);
        this.handleState();
        this.videoEnabledVM.set(true);
        this.postVideoState(true);
        return this.outVideoStream;
    }

    stopVideo = async () => {
        if (this.outVideoStream) {
            // mobile not sending black frame here, wtf
            this.outVideoStream.blinded = true;
            if (AppConfig.getPlatform() !== 'mobile') {
                // mobile webrtc will send closed stream next time in this case, it will lead to crash on other mobile
                this.outVideoStream.close();
                this.outVideoStream = undefined;
            }
            this.outVideoVM.set([this.outVideoStream, this.outScreenStream]);

        }
        this.postVideoState(false);
        return undefined;
    }

    postVideoState = (enabled: boolean) => {
        backoff(async () => {
            await this.client.mutateconferenceAlterMediaState({
                id: this.conferenceId,
                state: {
                    videoOut: enabled
                }
            });
        });
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;

        this.analizer.dispose();
        this.volumeSpace.dispose();

        console.log('[WEBRTC] Destroying conference');

        // Destroy streams
        for (let s of this.streamsVM.keys()) {
            this.streamsVM.get(s)!.destroy();
        }

        // Destroy out media
        if (this.mediaStream) {
            this.mediaStream.close();
        }

        if (this.outVideoStream) {
            this.outVideoStream.close();
        }
        if (this.outScreenStream) {
            this.outScreenStream.close();
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
            this.onStatusChange(this.isPrivate ? 'waiting' : 'connected', !this.isPrivate ? joinConference.conference.startTime : undefined);
            this.doStart();

            this.detectOwnPeerRemoved();

            return;
        })();
    }

    private detectOwnPeerRemoved = async () => {
        let queue = new Queue();
        let subscription = reliableWatcher<ConferenceWatch>((handler) => this.client.subscribeConferenceWatch({ id: this.conferenceId }, handler), (src) => {
            queue.post(src);
        });
        while (!this.destroyed) {
            try {
                let peers = (await queue.get()).alphaConferenceWatch.peers;
                let ownPeerDetected = !!(peers as any[]).find(p => p.id === this.peerId);
                if (this.ownPeerDetected && !ownPeerDetected) {
                    this.onDestroyRequested();
                }
                this.ownPeerDetected = ownPeerDetected;
            } catch (e) {
                console.warn(e);
            }
        }
        subscription();
    }

    private doStart = () => {

        // Start keep alive
        this.doKeepAlive();

        // Request media
        AppUserMedia.getUserAudio()
            .then((str) => {
                if (this.destroyed) {
                    str.close();
                } else {
                    this.mediaStream = str;
                    this.mediaStream.muted = this.mute;
                    this.handleState();
                }
            })
            .catch((e) => {
                // Just ignore...
            });

        // Load media streams
        let queue = new Queue();
        let subscription = reliableWatcher<ConferenceMediaWatch>((handler) => this.client.subscribeConferenceMediaWatch({ peerId: this.peerId, id: this.conferenceId }, handler), (src) => {
            queue.post(src);
        });

        (async () => {
            while (!this.destroyed) {
                try {
                    let state = (await queue.get()).media;
                    let streams = state.streams;
                    this.streamConfigs = streams;
                    this.handleState();
                } catch (e) {
                    console.warn(e);
                }
            }
            subscription();
        })();

    }

    private handleState = () => {
        if (!this.mediaStream || !this.streamConfigs || this.destroyed) {
            return;
        }
        console.log('[WEBRTC] Apply');

        // Detect deletions
        for (let s of this.streamsVM.keys()) {
            if (!this.streamConfigs.find((v) => v.id === s)) {
                console.log('[WEBRTC] Destroy stream ' + s);
                let stream = this.streamsVM.get(s);
                let appStream = stream?.getVideoInStream();
                let peerId = stream?.getTargetPeerId();
                if (peerId && appStream) {
                    this.peerVideoVM.remove(peerId, appStream);
                }
                stream?.destroy();
                this.streamsVM.delete(s);
            }
        }

        // close screen share if it does not have streams
        if (this.outScreenStream?.binded && !this.streamConfigs.find(s => s.settings.videoOut && s.settings.videoOutSource === 'screen_share')) {
            this.stopScreenShare();
        }

        for (let s of this.streamConfigs) {
            let ms = this.streamsVM.get(s.id);
            let videoStream = s.settings.videoOut ? (s.settings.videoOutSource === 'screen_share' ? this.outScreenStream : this.outVideoStream) : undefined;
            if (this.outScreenStream && videoStream === this.outScreenStream) {
                this.outScreenStream.binded = true;
            }
            if (ms) {
                if (videoStream && (ms.getVideoOutStream() !== videoStream)) {
                    ms.addStream(videoStream);
                }
                ms.onStateChanged(s);
            } else {
                console.log('[WEBRTC] Create stream ' + s.id);

                ms = new MediaStreamManager(this.client, s.id, this.peerId, this.iceServers, s.settings.audioOut ? this.mediaStream : undefined, s, this.isPrivate ? () => this.onStatusChange('connected') : undefined, s.peerId, videoStream, s.mediaState.videoSource);
                this.streamsVM.set(s.id, ms);

                ms.listenVideoInStream(c => {
                    this.videoEnabledVM.set(!!c);
                    if (c && s.peerId) {
                        this.peerVideoVM.add(s.peerId, c);
                    }
                });
                ms.listenDc(m => {
                    this.dcVM.set(m);
                });
            }
            if (s.peerId) {
                this.peerStreamMediaStateVM.add(s.peerId, s.id, s.mediaState);
            }
        }
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

    getPeerId = () => {
        return this.peerId;
    }

    sendDcMessage = (message: string) => {
        for (let ms of [...this.streamsVM.values()]) {
            ms.sendDcMessage(message);
        }
    }

}