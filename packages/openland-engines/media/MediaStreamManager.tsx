import { OpenlandClient } from 'openland-api/spacex';
import { ConferenceMedia_conferenceMedia_streams, ConferenceMedia_conferenceMedia_iceServers, MediaStreamVideoSource } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';

export class MediaStreamManager {
    private readonly id: string;
    private readonly client: OpenlandClient;
    private readonly peerId: string;
    private readonly targetPeerId: string | null;
    private audioOutTrack: AppMediaStreamTrack;
    private pendingVideoOutTrack?: AppMediaStreamTrack;
    private videoOutTrack?: AppMediaStreamTrack;
    private audioInTrack?: AppMediaStreamTrack;
    private videoInTrack?: AppMediaStreamTrack;
    private videoInTrackScreenShare: boolean = false;
    private readonly iceServers: ConferenceMedia_conferenceMedia_iceServers[];
    private readonly peerConnection: AppPeerConnection;
    private streamConfig: ConferenceMedia_conferenceMedia_streams;
    private seq: number;
    private localDescription?: string;
    private remoteDescription?: string;
    private appliedCandidates = new Set<string>();
    private destroyed = false;
    private onReady?: () => void;
    private contentTrackListeners = new Set<(stream?: AppMediaStreamTrack) => void>();

    private _queue: ExecutionQueue;
    private pendingNegotiation = false;
    constructor(
        client: OpenlandClient,
        id: string,
        peerId: string,
        iceServers: ConferenceMedia_conferenceMedia_iceServers[],
        audioTrack: AppMediaStreamTrack,
        videoTrack: AppMediaStreamTrack | undefined,
        streamConfig: ConferenceMedia_conferenceMedia_streams,
        onReady: (() => void) | undefined,
        targetPeerId: string | null,
    ) {
        this._queue = new ExecutionQueue();
        this.id = id;
        this.client = client;
        this.peerId = peerId;
        this.targetPeerId = targetPeerId;
        this.iceServers = iceServers;
        this.streamConfig = streamConfig;
        this.seq = -1;
        this.audioOutTrack = audioTrack;
        this.pendingVideoOutTrack = videoTrack;
        this.onReady = onReady;
        this.peerConnection = AppPeerConnectionFactory.createConnection({
            iceServers: this.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            iceTransportPolicy: streamConfig.settings.iceTransportPolicy || undefined,
        });

        this.peerConnection.onicecandidate = (ev) => {
            backoff(async () => {
                if (this.destroyed) {
                    return;
                }

                if (ev.candidate) {
                    console.log('ICE:' + ev.candidate);
                    await this.client.mutateMediaCandidate({
                        id: this.id,
                        peerId: this.peerId,
                        candidate: ev.candidate
                    });
                }
            });
        };

        this.peerConnection.ontrackadded = this.onTrackAdded;
        if (this.audioOutTrack) {
            this.peerConnection.addTrack(this.audioOutTrack);
        }
        this._queue.post(() => this.handleState(this.streamConfig));
    }

    onStateChanged = (streamConfig: ConferenceMedia_conferenceMedia_streams, videoTrack?: AppMediaStreamTrack) => {
        this.pendingVideoOutTrack = videoTrack;
        this._queue.post(() => this.handleState(streamConfig));
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.peerConnection.close();
    }

    private handleState = async (streamConfig: ConferenceMedia_conferenceMedia_streams) => {
        let seqBumped = false;
        if (streamConfig.seq > this.seq) {
            this.seq = streamConfig.seq;
            this.streamConfig = streamConfig;
            seqBumped = true;
        }

        this.updateVideoStream();

        if (seqBumped) {
            if (this.streamConfig.state === 'NEED_OFFER') {
                this.localDescription = undefined;
                this.remoteDescription = undefined;
                await backoff(async () => {
                    if (this.destroyed) {
                        return;
                    }

                    console.log('[WEBRTC]: Creating offer ' + streamConfig.seq);
                    let offer = await this.peerConnection.createOffer();

                    await this.peerConnection.setLocalDescription(offer);
                    this.localDescription = offer;

                    await this.client.mutateMediaOffer({
                        id: this.id,
                        peerId: this.peerId,
                        offer: this.localDescription,
                        seq: streamConfig.seq
                    });
                });
            } else if (this.streamConfig.state === 'NEED_ANSWER') {
                this.localDescription = undefined;
                this.remoteDescription = undefined;

                await backoff(async () => {
                    if (this.destroyed) {
                        return;
                    }

                    console.log('[WEBRTC]: Received offer ' + streamConfig.seq);
                    // damn you chrome
                    let offer = this.streamConfig.sdp!;
                    await this.peerConnection.setRemoteDescription(offer);
                    this.remoteDescription = offer;

                    console.log('[WEBRTC]: Creating answer ' + streamConfig.seq);
                    let answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.localDescription = answer;

                    await this.client.mutateMediaAnswer({
                        id: this.id,
                        peerId: this.peerId,
                        answer: this.localDescription,
                        seq: streamConfig.seq
                    });
                });
            } else if (this.streamConfig.state === 'READY') {
                await backoff(async () => {
                    if (this.destroyed) {
                        return;
                    }

                    if (!this.remoteDescription) {
                        console.log('[WEBRTC]: Received answer ' + streamConfig.seq);
                        let offer = this.streamConfig.sdp!;
                        await this.peerConnection.setRemoteDescription(offer);
                        this.remoteDescription = offer;
                        console.log('[WEBRTC]: Accepted answer ' + streamConfig.seq);
                    }

                    if (this.onReady) {
                        this.onReady();
                    }

                    if (this.pendingNegotiation) {
                        this.pendingNegotiation = false;
                        console.warn('[WEBRTC]: onnegotiationneeded ask from pend');
                    }
                });
            }
        }

        // Apply ICE
        if (this.remoteDescription && this.localDescription) {
            for (let ice of streamConfig.ice) {
                if (!this.appliedCandidates.has(ice)) {
                    this.appliedCandidates.add(ice);
                    backoff(async () => {
                        if (this.destroyed) {
                            return;
                        }
                        console.log('[WEBRTC]: INCOMING ICE:' + ice);
                        await this.peerConnection.addIceCandidate(ice);
                    });
                }
            }
        }
    }

    onTrackAdded = (track: AppMediaStreamTrack) => {
        if (track.kind === 'audio') {
            this.audioInTrack = track;
        } else if (track.kind === 'video') {
            let isScreenShare = this.streamConfig.mediaState.videoSource === MediaStreamVideoSource.screen_share;
            this.videoInTrack = track;
            this.videoInTrackScreenShare = isScreenShare;
            this.notifyVideoInStream();
        }
    }

    updateVideoStream = () => {
        if (this.pendingVideoOutTrack && this.streamConfig.localStreams.find(s => s.__typename === 'LocalStreamVideoConfig')) {
            if (this.videoOutTrack !== this.pendingVideoOutTrack) {
                this.videoOutTrack = this.pendingVideoOutTrack;
                this.peerConnection.addTrack(this.pendingVideoOutTrack);
            }
        } else if (this.videoOutTrack) {
            this.peerConnection.removeTrack(this.videoOutTrack);
            this.videoOutTrack = undefined;
        }
    }

    ////
    // IO
    ////
    getAudioOutTrack = () => {
        return this.audioOutTrack;
    }
    getVideoInTrack = () => {
        return this.videoInTrack;
    }
    isVideoInScreenshare = () => {
        return this.videoInTrackScreenShare;
    }
    getVideoOutTrack = () => {
        return this.videoOutTrack;
    }

    getAudioInTrack = () => {
        return this.audioInTrack;
    }

    getConnection = () => {
        return this.peerConnection;
    }

    getTargetPeerId = () => {
        return this.targetPeerId;
    }

    getPeerId = () => {
        return this.peerId;
    }

    listenVideoInTrack = (listener: (stream?: AppMediaStreamTrack) => void) => {
        this.contentTrackListeners.add(listener);
        listener(this.videoInTrack);
        return () => {
            this.contentTrackListeners.delete(listener);
        };
    }

    private notifyVideoInStream = () => {
        this.contentTrackListeners.forEach(l => l(this.videoInTrack));
    }
}