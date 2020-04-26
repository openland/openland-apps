import { OpenlandClient } from 'openland-api/spacex';
import { backoff } from 'openland-y-utils/timer';
import { MediaStreamManager } from './MediaStreamManager';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';
import { ConferenceMediaWatch, ConferenceMediaWatch_media_streams, ConferenceMediaWatch_media_streams_mediaState, GlobalEventBus } from 'openland-api/spacex.types';
import { AppBackgroundTask } from 'openland-y-runtime/AppBackgroundTask';
import { Queue } from 'openland-y-utils/Queue';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ConferenceWatch } from 'openland-api/spacex.types';
// import { MediaStreamsAlalyzer } from './MediaStreamsAlalyzer';
// import { MediaSessionVolumeSpace } from './MediaSessionVolumeSpace';
import { VMMap, VM, VMSetMap, VMMapMap } from 'openland-y-utils/mvvm/vm';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

export class MediaSessionManager {
    messenger: MessengerEngine;
    readonly conversationId: string;
    private readonly client: OpenlandClient;
    private readonly onStatusChange: (status: 'waiting' | 'connected', startTime?: number) => void;
    private readonly onDestroyRequested: () => void;
    private outAudioTrack!: AppMediaStreamTrack;
    private outVideoTrack?: AppMediaStreamTrack;
    private outScreenTrack?: AppMediaStreamTrack;
    private outScreenTrackBinded: boolean = false;
    private streamConfigs!: ConferenceMediaWatch_media_streams[];
    private iceServers!: any[];
    private conferenceId!: string;
    private peerId!: string;
    private destroyed = false;
    private mute: boolean;
    private isPrivate: boolean;
    private ownPeerDetected = false;
    // readonly analyzer: MediaStreamsAlalyzer;
    // readonly volumeSpace: MediaSessionVolumeSpace;

    readonly streamsVM = new VMMap<string, MediaStreamManager>();
    readonly peerStreamMediaStateVM = new VMMapMap<string, string, ConferenceMediaWatch_media_streams_mediaState>();
    readonly peerVideoVM = new VMMapMap<string, 'camera' | 'screen_share' | undefined | null, AppMediaStreamTrack>();
    readonly peerMediStateVM = new VMSetMap<string, AppMediaStreamTrack>();
    readonly videoEnabledVM = new VM<boolean>();
    readonly outVideoVM = new VM<(AppMediaStreamTrack | undefined)[]>();

    constructor(messenger: MessengerEngine, client: OpenlandClient, conversationId: string, mute: boolean, isPrivate: boolean, onStatusChange: (status: 'waiting' | 'connected', startTime?: number) => void, onDestroyRequested: () => void, onVideoEnabled: () => void) {
        this.messenger = messenger;
        this.client = client;
        this.conversationId = conversationId;
        this.mute = mute;
        this.onStatusChange = onStatusChange;
        this.onDestroyRequested = onDestroyRequested;
        this.isPrivate = isPrivate;
        this.doInit();
        // this.analyzer = new MediaStreamsAlalyzer(this);
        // this.volumeSpace = new MediaSessionVolumeSpace(this.messenger, this);
        this.videoEnabledVM.listen(onVideoEnabled);
    }

    setMute = (mute: boolean) => {
        this.mute = mute;
        if (this.outAudioTrack) {
            this.outAudioTrack.enabled = !mute;
        }
        backoff(async () => {
            await this.client.mutateconferenceAlterMediaState({
                id: this.conferenceId,
                state: {
                    audioPaused: mute
                }
            });
        });
    }

    startScreenShare = async () => {
        if (!this.outScreenTrack) {
            try {
                this.outScreenTrack = await AppUserMedia.getUserScreen();
            } catch (e) {
                // ignore
            }
        }
        if (!this.outScreenTrack) {
            return;
        }
        backoff(async () => {
            await this.client.mutateconferenceAddScreenShare({
                id: this.conferenceId,
            });
        });
        this.outScreenTrack.enabled = true;
        this.handleState();
        this.videoEnabledVM.set(true);
        this.outVideoVM.set([this.outVideoTrack, this.outScreenTrack]);
    }

    stopScreenShare = async () => {
        backoff(async () => {
            await this.client.mutateconferenceRemoveScreenShare({
                id: this.conferenceId,
            });
        });
        if (this.outScreenTrack) {
            this.outScreenTrack.enabled = false;
            this.outScreenTrack.stop();
            this.outScreenTrack = undefined;
        }
        this.outVideoVM.set([this.outVideoTrack, this.outScreenTrack]);
    }

    startVideo = async () => {
        if (!this.outVideoTrack) {
            this.outVideoTrack = await AppUserMedia.getUserVideo();
        }
        this.outVideoTrack.enabled = true;
        this.outVideoVM.set([this.outVideoTrack, this.outScreenTrack]);
        this.handleState();
        this.videoEnabledVM.set(true);
        this.postVideoState(true);
    }

    stopVideo = async () => {
        if (this.outVideoTrack) {
            this.outVideoTrack.enabled = false;
            this.outVideoVM.set([this.outVideoTrack, this.outScreenTrack]);

        }
        this.postVideoState(false);
    }

    postVideoState = (enabled: boolean) => {
        backoff(async () => {
            await this.client.mutateconferenceAlterMediaState({
                id: this.conferenceId,
                state: {
                    videoPaused: !enabled
                }
            });
        });
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;

        // this.analyzer.dispose();
        // this.volumeSpace.dispose();

        console.log('[WEBRTC] Destroying conference');

        // Destroy streams
        for (let s of this.streamsVM.keys()) {
            this.streamsVM.get(s)!.destroy();
        }

        // Stop Tracks
        if (this.outAudioTrack) {
            this.outAudioTrack.stop();
        }
        if (this.outVideoTrack) {
            this.outVideoTrack.stop();
        }
        if (this.outScreenTrack) {
            this.outScreenTrack.stop();
        }

        // this.eventBusSubscription();

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
                    str.stop();
                } else {
                    this.outAudioTrack = str;
                    this.outAudioTrack.enabled = !this.mute;
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
        if (!this.outAudioTrack || !this.streamConfigs || this.destroyed) {
            return;
        }
        console.log('[WEBRTC] Apply');

        // Detect deletions
        for (let s of this.streamsVM.keys()) {
            if (!this.streamConfigs.find((v) => v.id === s)) {
                console.log('[WEBRTC] Destroy stream ' + s);
                let stream = this.streamsVM.get(s);
                let appStream = stream?.getVideoInTrack();
                let peerId = stream?.getTargetPeerId();
                if (peerId && appStream && stream) {
                    if (stream.isVideoInScreenshare()) {
                        this.peerVideoVM.deleteVal(peerId, 'screen_share');
                    } else {
                        this.peerVideoVM.deleteVal(peerId, 'camera');
                    }
                }
                stream?.destroy();
                this.streamsVM.delete(s);
            }
        }

        // close screen share if it does not have streams
        if (this.outScreenTrackBinded && !this.streamConfigs.find(s => s.settings.videoOut && s.settings.videoOutSource === 'screen_share')) {
            this.stopScreenShare();
        }

        for (let s of this.streamConfigs) {
            let ms = this.streamsVM.get(s.id);
            let videoTrack = s.settings.videoOut ? (s.settings.videoOutSource === 'screen_share' ? this.outScreenTrack : this.outVideoTrack) : undefined;
            if (this.outScreenTrack && videoTrack === this.outScreenTrack) {
                this.outScreenTrackBinded = true;
            }
            if (ms) {
                ms.onStateChanged(s, videoTrack);
            } else {
                console.log('[WEBRTC] Create stream ' + s.id);

                ms = new MediaStreamManager(this.client, s.id, this.peerId, this.iceServers, this.outAudioTrack, videoTrack, s, this.isPrivate ? () => this.onStatusChange('connected') : undefined, s.peerId);
                this.streamsVM.set(s.id, ms);

                ms.listenVideoInTrack(c => {
                    this.videoEnabledVM.set(!!c);
                    if (c && s.peerId) {
                        console.warn('session', s.peerId, c);
                        if (ms?.isVideoInScreenshare) {
                            this.peerVideoVM.add(s.peerId, 'screen_share', c);
                        } else {
                            this.peerVideoVM.add(s.peerId, 'camera', c);
                        }
                    }
                });
                // ms.listenDc(m => {
                //     this.dcVM.set(m);
                // });
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

    sendDcMessage = (data: any) => {
        // for (let ms of [...this.streamsVM.values()]) {
        //     ms.sendDcMessage(JSON.stringify({ peerId: this.peerId, data }));
        // }
        if (this.peerId) {
            this.messenger.client.mutateGlobalEventBusPublish({ topic: `media_session_${this.conversationId}`, message: JSON.stringify({ peerId: this.peerId, data }) });
        }
    }

}