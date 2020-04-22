import { OpenlandClient } from 'openland-api/spacex';
import { ConferenceMedia_conferenceMedia_streams, ConferenceMedia_conferenceMedia_streams_localStreams_LocalStreamDataChannelConfig, ConferenceMedia_conferenceMedia_iceServers, MediaStreamVideoSource } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection, IceState } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';
import { VMSetMap } from 'openland-y-utils/mvvm/vm';

export class MediaStreamManager {
    private readonly id: string;
    private readonly client: OpenlandClient;
    private readonly peerId: string;
    private readonly targetPeerId: string | null;
    private audioOutStream: AppMediaStream;
    private pendingVideoOutStream?: AppMediaStream;
    private videoOutStream?: AppMediaStream;
    private audioInStream?: AppMediaStream;
    private videoInStream?: AppMediaStream;
    private readonly iceServers: ConferenceMedia_conferenceMedia_iceServers[];
    private readonly peerConnection: AppPeerConnection;
    private streamConfig: ConferenceMedia_conferenceMedia_streams;
    private seq: number;
    private localDescription?: string;
    private remoteDescription?: string;
    private appliedCandidates = new Set<string>();
    private destroyed = false;
    private onReady?: () => void;
    private iceConnectionState: IceState = 'new';
    private iceStateListeners = new Set<(iceState: IceState) => void>();
    private contentStreamListeners = new Set<(stream?: AppMediaStream) => void>();
    private dcVM = new VMSetMap<number, (message: { peerId: string, data: any }) => void>();

    private _queue: ExecutionQueue;
    private pendingNegotiation = false;
    constructor(
        client: OpenlandClient,
        id: string,
        peerId: string,
        iceServers: ConferenceMedia_conferenceMedia_iceServers[],
        stream: AppMediaStream,
        videoStream: AppMediaStream | undefined,
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
        this.audioOutStream = stream;
        this.pendingVideoOutStream = videoStream;
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

        this.peerConnection.oniceconnectionstatechange = (ev) => {
            console.warn('[WEBRTC]: oniceconnectionstatechange ' + ev.target.iceConnectionState);
            this.iceConnectionState = ev.target.iceConnectionState;
            this.notifyIceState(this.iceConnectionState);
            if (ev.target.iceConnectionState === 'failed') {
                this.destroy();
                backoff(async () => {
                    await this.client.mutateMediaFailed({ id: this.id, peerId: this.peerId });
                });
            }
        };
        this.peerConnection.onStreamAdded = this.onStreamAdded;
        if (this.audioOutStream) {
            this.peerConnection.addStream(this.audioOutStream);
        }

        this.peerConnection.onDataChannelMessage = (channelId, m) => {
            let message = { peerId: this.targetPeerId || this.id, data: m };
            for (let l of this.dcVM.get(channelId)?.values() || []) {
                l(message);
            }
        };
        this._queue.post(() => this.handleState(this.streamConfig));
    }

    onStateChanged = (streamConfig: ConferenceMedia_conferenceMedia_streams, videoStream?: AppMediaStream) => {
        this.pendingVideoOutStream = videoStream;
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

        let dcConfigs: ConferenceMedia_conferenceMedia_streams_localStreams_LocalStreamDataChannelConfig[] = this.streamConfig.localStreams.filter(s => s.__typename === 'LocalStreamDataChannelConfig') as ConferenceMedia_conferenceMedia_streams_localStreams_LocalStreamDataChannelConfig[];
        this.peerConnection.updateDataChannels(dcConfigs);
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

    onStreamAdded = (stream: AppMediaStream) => {
        if (stream.hasAudio()) {
            this.audioInStream = stream;
        }
        if (stream.hasVideo()) {
            let isScreenShare = this.streamConfig.mediaState.videoSource === MediaStreamVideoSource.screen_share;
            stream.source = isScreenShare ? 'screen_share' : 'camera';

            this.videoInStream = stream;
            this.notifyVideoInStream();
        }
    }

    updateVideoStream = () => {
        if (this.pendingVideoOutStream && this.streamConfig.localStreams.find(s => s.__typename === 'LocalStreamVideoConfig')) {
            if (this.videoOutStream !== this.pendingVideoOutStream) {
                this.videoOutStream = this.pendingVideoOutStream;
                this.peerConnection.addStream(this.pendingVideoOutStream);
            }
        } else if (this.videoOutStream) {
            this.peerConnection.removeStream(this.videoOutStream);
            this.videoOutStream = undefined;
        }
    }

    setVolume = (volume: number) => {
        this.peerConnection.setVolume(volume);
    }

    ////
    // IO
    ////
    getAudioOutStream = () => {
        return this.audioOutStream;
    }
    getVideoInStream = () => {
        return this.videoInStream;
    }
    getVideoOutStream = () => {
        return this.videoOutStream;
    }

    getAudioInStream = () => {
        return this.audioInStream;
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

    listenIceState = (listener: (iceState: IceState) => void) => {
        this.iceStateListeners.add(listener);
        listener(this.iceConnectionState);
        return () => {
            this.iceStateListeners.forEach(l => this.iceStateListeners.delete(l));
        };
    }

    private notifyIceState = (iceState: IceState) => {
        this.iceStateListeners.forEach(l => l(iceState));
    }

    getIceState = () => {
        return this.iceConnectionState;
    }

    listenVideoInStream = (listener: (stream?: AppMediaStream) => void) => {
        this.contentStreamListeners.add(listener);
        listener(this.videoInStream);
        return () => {
            this.contentStreamListeners.delete(listener);
        };
    }

    private notifyVideoInStream = () => {
        this.contentStreamListeners.forEach(l => l(this.videoInStream));
    }

    ////
    // DC
    ////

    sendDcMessage = (message: string, dataChannelId: number = 0) => {
        this.peerConnection.sendDataChannelMessage(dataChannelId, message);
    }

    listenDc = (listener: (message: { peerId: string, data: any }) => void, channelId: number = 0) => {
        this.dcVM.add(channelId, listener);
        return () => {
            this.dcVM.remove(channelId, listener);
        };
    }
}