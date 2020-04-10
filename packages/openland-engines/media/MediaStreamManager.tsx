import { OpenlandClient } from 'openland-api/spacex';
import { ConferenceMedia_conferenceMedia_streams, ConferenceMedia_conferenceMedia_iceServers } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection, IceState } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';
import { mangleSDP } from './mangleSDP';

export class MediaStreamManager {
    private readonly id: string;
    private readonly client: OpenlandClient;
    private readonly peerId: string;
    private readonly targetPeerId: string | null;
    private audioOutStream?: AppMediaStream;
    private videoOutStream?: AppMediaStream;
    private audioOutSentStreamId?: string;
    private videoOutSentStreamId?: string;
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
    private dcListeners = new Set<(message: { peerId: string, data: any }) => void>();
    private videoInStreamSource: 'camera' | 'screen_share' | null;

    private ignoreNextNegotiationNeeded = false;
    private _queue: ExecutionQueue;
    private pendingNegotiation = false;
    constructor(
        client: OpenlandClient,
        id: string,
        peerId: string,
        iceServers: ConferenceMedia_conferenceMedia_iceServers[],
        stream: AppMediaStream | undefined,
        streamConfig: ConferenceMedia_conferenceMedia_streams,
        onReady: (() => void) | undefined,
        targetPeerId: string | null,
        videoOutStream: AppMediaStream | undefined,
        videoInStreamSource: 'camera' | 'screen_share' | null,
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
        this.videoOutStream = videoOutStream;
        this.videoInStreamSource = videoInStreamSource;
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

        this.peerConnection.onnegotiationneeded = () => {
            console.warn('[WEBRTC]: onnegotiationneeded ask from pc');
            this.negotiateIfReady();
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
        if (this.videoOutStream) {
            this.peerConnection.addStream(this.videoOutStream);
        }

        this.peerConnection.onDcMessage = (m) => {
            let message = { peerId: this.targetPeerId || this.id, data: m };
            for (let l of this.dcListeners) {
                l(message);
            }
        };
        this._queue.post(() => this.handleState(this.streamConfig));
    }

    negotiateIfReady = () => {
        if (this.ignoreNextNegotiationNeeded) {
            this.ignoreNextNegotiationNeeded = false;
            console.warn('[WEBRTC]: onnegotiationneeded ignored');
            return;
        }
        this._queue.post(async () => {
            console.warn('[WEBRTC]: onnegotiationneeded check');
            if (this.streamConfig.state === 'READY') {
                // media mb changed after negotiation complete (or was pent)
                await backoff(async () => {
                    if (!this.destroyed) {
                        await this.client.mutateMediaNegotiationNeeded({ id: this.id, peerId: this.peerId, seq: this.seq });
                        console.warn('[WEBRTC]: onnegotiationneeded sent');
                    }
                });
            } else if (this.streamConfig.state === 'NEED_OFFER' || this.streamConfig.state === 'NEED_ANSWER') {
                // media chaged right after we sent offer/answer - wait for READY state
                console.warn('[WEBRTC]: onnegotiationneeded pent');
                this.pendingNegotiation = true;
            } else {
                // media chaged, but we are about to create new sdp
                console.warn('[WEBRTC]: onnegotiationneeded rejected');
            }
        });
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
                    // damn you chrome (it can fire onnegotiationneeded here, wtf)
                    this.ignoreNextNegotiationNeeded = true;
                    // remember stream we created sdp with to check if them not changed during ignore
                    this.audioOutSentStreamId = this.audioOutStream?.id;
                    this.videoOutSentStreamId = this.videoOutStream?.id;
                    let offer = await this.peerConnection.createOffer();
                    offer = JSON.stringify({ type: 'offer', sdp: mangleSDP(JSON.parse(offer).sdp) });

                    await this.peerConnection.setLocalDescription(offer);
                    this.localDescription = offer;
                    this.ignoreNextNegotiationNeeded = false;

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
                    this.ignoreNextNegotiationNeeded = true;
                    let offer = this.streamConfig.sdp!;
                    await this.peerConnection.setRemoteDescription(offer);
                    this.remoteDescription = offer;

                    console.log('[WEBRTC]: Creating answer ' + streamConfig.seq);
                    // remember stream we created sdp with to check if them not changed during ignore
                    this.audioOutSentStreamId = this.audioOutStream?.id;
                    this.videoOutSentStreamId = this.videoOutStream?.id;
                    let answer = await this.peerConnection.createAnswer();
                    answer = JSON.stringify({ type: 'answer', sdp: mangleSDP(JSON.parse(answer).sdp) });
                    await this.peerConnection.setLocalDescription(answer);
                    this.ignoreNextNegotiationNeeded = false;
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
                        this.negotiateIfReady();
                    }

                    // mb media changed while onnegotiationneeded was ignored (damn you chrome)
                    // check if media changed
                    if (this.audioOutSentStreamId !== this.audioOutStream?.id || this.videoOutSentStreamId !== this.videoOutStream?.id) {
                        console.warn('[WEBRTC]: onnegotiationneeded ask from streams check');
                        this.negotiateIfReady();
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

    // TODO: move screen share to separate peer connection
    // WebRTC still can't detect stream/track removal, so we cant display ui prpperly :/
    onStreamAdded = (stream: AppMediaStream) => {
        if (stream.hasAudio()) {
            this.audioInStream = stream;
        }
        if (stream.hasVideo()) {
            stream.source = this.videoInStreamSource || 'camera';
            if (this.videoInStream !== undefined) {
                this.videoInStream.close();
            }

            this.videoInStream = stream;
            this.notifyVideoInStream();
        }
    }

    addStream = (stream: AppMediaStream) => {
        this._queue.post(() => {
            if (stream.hasAudio()) {
                if (this.audioOutStream !== stream) {
                    this.audioOutStream = stream;
                    this.peerConnection.addStream(stream);
                }
            }
            if (stream.hasVideo()) {
                if (this.videoOutStream !== stream) {
                    this.videoOutStream = stream;
                    this.peerConnection.addStream(stream);
                }
            }

        });
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

    sendDcMessage = (message: string) => {
        this.peerConnection.sendDCMessage(message);
    }

    listenDc = (listener: (message: { peerId: string, data: any }) => void) => {
        this.dcListeners.add(listener);
        return () => {
            this.dcListeners.delete(listener);
        };
    }
}