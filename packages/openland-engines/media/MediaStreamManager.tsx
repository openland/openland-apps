import { OpenlandClient } from 'openland-api/spacex';
import { ConferenceMedia_conferenceMedia_streams, ConferenceMedia_conferenceMedia_iceServers } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection, IceState } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';

export class MediaStreamManager {
    private readonly id: string;
    private readonly client: OpenlandClient;
    private readonly peerId: string;
    private readonly targetPeerId: string | null;
    private readonly audioOutStream: AppMediaStream;
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
    private audioInStream?: AppMediaStream;
    private videoInStream?: AppMediaStream;
    private videoOutStream?: AppMediaStream;
    // private ignoreNextNegotiationNeeded = false;
    private _queue: ExecutionQueue;
    constructor(
        client: OpenlandClient,
        id: string,
        peerId: string,
        iceServers: ConferenceMedia_conferenceMedia_iceServers[],
        stream: AppMediaStream,
        streamConfig: ConferenceMedia_conferenceMedia_streams,
        onReady: (() => void) | undefined,
        targetPeerId: string | null,
        outContentStream?: AppMediaStream
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
        this.videoOutStream = outContentStream;
        this.onReady = onReady;
        this.peerConnection = AppPeerConnectionFactory.createConnection({
            iceServers: this.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            iceTransportPolicy: 'relay',
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

        this.peerConnection.onnegotiationneeded = () => {
            console.warn('[WEBRTC]: onnegotiationneeded ask');
            // if (this.ignoreNextNegotiationNeeded) {
            //     this.ignoreNextNegotiationNeeded = false;
            //     return;
            // }
            console.warn('[WEBRTC]: onnegotiationneeded confirmed');
            if (this.destroyed) {
                return;
            }
            backoff(async () => {
                let res = await this.client.mutateMediaNegotiationNeeded({ id: this.id, peerId: this.peerId, seq: this.seq });
                console.warn('[WEBRTC] res: ', this.seq, res.mediaStreamNegotiationNeeded.streams[0].seq);
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
        this.peerConnection.addStream(this.audioOutStream);
        if (this.videoOutStream) {
            this.peerConnection.addStream(this.videoOutStream);
        }
        this._queue.post(() => this.handleState(this.streamConfig));
    }

    onStateChanged = (streamConfig: ConferenceMedia_conferenceMedia_streams) => {
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
        if (streamConfig.seq > this.seq) {
            this.seq = streamConfig.seq;
            this.streamConfig = streamConfig;
            if (this.streamConfig.state === 'NEED_OFFER') {
                this.localDescription = undefined;
                this.remoteDescription = undefined;
                await backoff(async () => {
                    if (this.destroyed) {
                        return;
                    }

                    console.log('[WEBRTC]: Creating offer ' + streamConfig.seq);
                    let offer = await this.peerConnection.createOffer();
                    // this.ignoreNextNegotiationNeeded = true;
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
                    let offer = this.streamConfig.sdp!;
                    await this.peerConnection.setRemoteDescription(offer);
                    this.remoteDescription = offer;

                    console.log('[WEBRTC]: Creating answer ' + streamConfig.seq);
                    let answer = await this.peerConnection.createAnswer();
                    // this.ignoreNextNegotiationNeeded = true;
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

                });
            }

        }

        // Apply ICE
        if (this.remoteDescription && this.localDescription) {
            for (let ice of this.streamConfig.ice) {
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

    // TODO: move screen share to separate peer connection
    // WebRTC still can't detect stream/track removal, so we cant display ui prpperly :/
    onStreamAdded = (stream: AppMediaStream) => {
        if (stream.hasAudio()) {
            this.audioInStream = stream;
        }
        if (stream.hasVideo()) {
            if (this.videoInStream !== undefined) {
                this.videoInStream.close();
            }

            this.videoInStream = stream;
            this.notifyVideoInStream();
            stream.onClosed = () => {
                if (this.videoInStream === stream) {
                    this.videoInStream = undefined;
                }
                this.notifyVideoInStream();
            };
        }
    }

    addStream = (stream: AppMediaStream) => {
        if (this.videoOutStream !== stream) {
            this.videoOutStream = stream;
            this.peerConnection.addStream(stream);
        }
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

    listenContentStream = (listener: (stream?: AppMediaStream) => void) => {
        this.contentStreamListeners.add(listener);
        listener(this.videoInStream);
        return () => {
            this.contentStreamListeners.forEach(l => this.contentStreamListeners.delete(l));
        };
    }

    private notifyVideoInStream = () => {
        this.contentStreamListeners.forEach(l => l(this.videoInStream));
    }

}