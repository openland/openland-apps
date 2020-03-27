import * as React from 'react';
import { OpenlandClient } from 'openland-api/spacex';
import { backoff } from 'openland-y-utils/timer';
import { MediaStreamManager } from './MediaStreamManager';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { ConferenceMediaWatch, ConferenceMediaWatch_media_streams } from 'openland-api/spacex.types';
import { AppBackgroundTask } from 'openland-y-runtime/AppBackgroundTask';
import { Queue } from 'openland-y-utils/Queue';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ConferenceWatch } from 'openland-api/spacex.types';
import { MediaStreamsAlalizer } from './MediaStreamsAlalizer';

export class MediaSessionManager {
    readonly conversationId: string;
    private readonly client: OpenlandClient;
    private readonly onStatusChange: (status: 'waiting' | 'connected', startTime?: number) => void;
    private readonly onDestroyRequested: () => void;
    private readonly onVideoEnabledCallback: () => void;
    private mediaStream!: AppMediaStream;
    private outVideoStream?: AppMediaStream;
    private outScreenStream?: AppMediaStream;
    private activeStream?: AppMediaStream;
    private streamConfigs!: ConferenceMediaWatch_media_streams[];
    private iceServers!: any[];
    private conferenceId!: string;
    private peerId!: string;
    private destroyed = false;
    private mute: boolean;
    private isPrivate: boolean;
    private ownPeerDetected = false;
    private videoEnabled = false;

    readonly streams = new Map<string, MediaStreamManager>();
    readonly peerStreams = new Map<string, MediaStreamManager>();
    private streamsListeners = new Set<(streams: Map<string, MediaStreamManager>) => void>();
    private videoEnabledListeners = new Set<() => void>();
    readonly analizer: MediaStreamsAlalizer;

    constructor(client: OpenlandClient, conversationId: string, mute: boolean, isPrivate: boolean, onStatusChange: (status: 'waiting' | 'connected', startTime?: number) => void, onDestroyRequested: () => void, onVideoEnabled: () => void) {
        this.client = client;
        this.conversationId = conversationId;
        this.mute = mute;
        this.onStatusChange = onStatusChange;
        this.onDestroyRequested = onDestroyRequested;
        this.onVideoEnabledCallback = onVideoEnabled;
        this.isPrivate = isPrivate;
        this.doInit();
        this.analizer = new MediaStreamsAlalizer(this);
    }

    setMute = (mute: boolean) => {
        this.mute = mute;
        if (this.mediaStream) {
            this.mediaStream.muted = mute;
        }
    }

    startScreenShare = async () => {
        this.stopVideo();
        if (!this.outScreenStream) {
            this.outScreenStream = await AppUserMedia.getUserScreen();
        }
        this.outScreenStream.blinded = false;
        this.activeStream = this.outScreenStream;
        this.handleState();
        this.onVideoEnabled();
        return this.outScreenStream;
    }

    stopScreenShare = async () => {
        if (this.outScreenStream) {
            this.outScreenStream.blinded = true;
            this.outScreenStream.close();
            this.outScreenStream = undefined;
        }
    }

    startVideo = async () => {
        this.stopScreenShare();
        if (!this.outVideoStream) {
            this.outVideoStream = await AppUserMedia.getUserVideo();
        }
        this.outVideoStream.blinded = false;
        this.activeStream = this.outVideoStream;
        this.handleState();
        this.onVideoEnabled();
        return this.outVideoStream;
    }

    stopVideo = async () => {
        if (this.outVideoStream) {
            this.outVideoStream.blinded = true;
        }
    }

    onVideoEnabled = () => {
        if (!this.videoEnabled) {
            this.videoEnabled = true;
            this.onVideoEnabledCallback();
            this.notifyVideoEnabled();
        }
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;

        this.analizer.dispose();

        console.log('[WEBRTC] Destroying conference');

        // Destroy streams
        for (let s of this.streams.keys()) {
            this.streams.get(s)!.destroy();
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
        console.log('[WEBRTC] Apply: ', this.streamConfigs);

        // Detect deletions
        for (let s of this.streams.keys()) {
            if (!this.streamConfigs.find((v) => v.id === s)) {
                console.log('[WEBRTC] Destroy stream ' + s);
                this.streams.get(s)!.destroy();
                this.streams.delete(s);
            }
        }

        for (let s of this.streamConfigs) {
            let ms = this.streams.get(s.id);
            if (ms) {
                if (this.activeStream && (ms.getOutContentStream() !== this.activeStream)) {
                    ms.addStream(this.activeStream);
                }
                ms.onStateChanged(s);
            } else {
                console.log('[WEBRTC] Create stream ' + s.id);

                ms = new MediaStreamManager(this.client, s.id, this.peerId, this.iceServers, this.mediaStream, s, this.isPrivate ? () => this.onStatusChange('connected') : undefined, s.peerId, this.outVideoStream);
                this.streams.set(s.id, ms);
                let target = s.peerId;
                if (target) {
                    this.peerStreams.set(target, ms);
                }
                ms.listenContentStream(c => {
                    if (c) {
                        this.onVideoEnabled();
                    }
                });
            }
        }

        this.notifyStreamsChanged();
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

    ////
    // IO
    ////
    listenStreams = (listener: (streams: Map<string, MediaStreamManager>) => void) => {
        this.streamsListeners.add(listener);
        listener(this.streams);
        return () => {
            this.streamsListeners.delete(listener);
        };
    }

    notifyStreamsChanged = () => {
        this.streamsListeners.forEach(l => l(this.streams));
    }

    listenVideoEnabled = (listener: () => void) => {
        this.videoEnabledListeners.add(listener);
        if (this.videoEnabled) {
            listener();
        }
        return () => {
            this.videoEnabledListeners.delete(listener);
        };
    }

    notifyVideoEnabled = () => {
        this.videoEnabledListeners.forEach(l => l());
    }
}

export const useStream = (manager: MediaSessionManager | undefined, peerId: string) => {
    const [stream, setStream] = React.useState<MediaStreamManager>();
    React.useEffect(() => {
        if (!manager) {
            return;
        }
        return manager.listenStreams(streams => {
            if (manager.getPeerId() === peerId && streams.size) {
                setStream(streams.values().next().value);
            } else {
                streams.forEach(s => {
                    if (s.getTargetPeerId() === peerId) {
                        setStream(s);
                    }
                });
            }

        });
    }, [manager]);
    return stream;
};