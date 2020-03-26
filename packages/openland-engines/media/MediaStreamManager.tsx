import { OpenlandClient } from 'openland-api/spacex';
import { ConferenceMedia_conferenceMedia_streams, ConferenceMedia_conferenceMedia_iceServers } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection, IceState } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';

export class MediaStreamManager {
    private readonly id: string;
    private readonly client: OpenlandClient;
    private readonly peerId: string;
    private readonly targetPeerId: string | null;
    private readonly stream: AppMediaStream;
    private readonly iceServers: ConferenceMedia_conferenceMedia_iceServers[];
    private readonly peerConnection: AppPeerConnection;
    private streamConfig: ConferenceMedia_conferenceMedia_streams;
    private answerHandled = false;
    private offerHandled = false;
    private readyHandled = false;
    private localDescription?: string;
    private remoteDescription?: string;
    private appliedCandidates = new Set<string>();
    private destroyed = false;
    private onReady?: () => void;
    private iceConnectionState: IceState = 'new';
    private iceStateListeners = new Set<(iceState: IceState) => void>();
    private contentStreamListeners = new Set<(stream?: AppMediaStream) => void>();
    private mainInStream?: AppMediaStream;
    private contentInStream?: AppMediaStream;
    private outContentStream?: AppMediaStream;

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
        this.id = id;
        this.client = client;
        this.peerId = peerId;
        this.targetPeerId = targetPeerId;
        this.iceServers = iceServers;
        this.streamConfig = streamConfig;
        this.stream = stream;
        this.outContentStream = outContentStream;
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
            console.warn('[WEBRTC]: onnegotiationneeded');
            if (this.streamConfig.state === 'READY' && this.iceConnectionState === 'connected') {
                backoff(async () => {
                    if (this.destroyed) {
                        return;
                    }
                    await this.client.mutateMediaNegotiationNeeded({ id: this.id, peerId: this.peerId });
                });
            }
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
        this.peerConnection.addStream(this.stream);
        if (this.outContentStream) {
            this.peerConnection.addStream(this.outContentStream);
        }
        this.handleState();
    }

    onStateChanged = (streamConfig: ConferenceMedia_conferenceMedia_streams) => {
        this.streamConfig = streamConfig;
        this.handleState();
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.peerConnection.close();
    }

    private handleState = () => {
        if (this.streamConfig.state === 'NEED_OFFER') {
            if (this.offerHandled) {
                return;
            }
            this.offerHandled = true;
            this.readyHandled = false;
            this.localDescription = undefined;
            this.remoteDescription = undefined;
            backoff(async () => {
                if (this.destroyed) {
                    return;
                }

                if (!this.localDescription) {
                    console.log('[WEBRTC]: Creating offer');
                    let offer = await this.peerConnection.createOffer();
                    await this.peerConnection.setLocalDescription(offer);
                    this.localDescription = offer;
                }

                await this.client.mutateMediaOffer({
                    id: this.id,
                    peerId: this.peerId,
                    offer: this.localDescription
                });
            });
        } else if (this.streamConfig.state === 'NEED_ANSWER') {
            if (this.answerHandled) {
                return;
            }
            this.answerHandled = true;
            this.readyHandled = false;
            this.localDescription = undefined;
            this.remoteDescription = undefined;

            backoff(async () => {
                if (this.destroyed) {
                    return;
                }

                if (!this.remoteDescription) {
                    console.log('[WEBRTC]: Received offer');
                    let offer = this.streamConfig.sdp!;
                    await this.peerConnection.setRemoteDescription(offer);
                    this.remoteDescription = offer;
                }

                if (!this.localDescription) {
                    console.log('[WEBRTC]: Creating answer');
                    let answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.localDescription = answer;
                }

                this.handleState();

                await this.client.mutateMediaAnswer({
                    id: this.id,
                    peerId: this.peerId,
                    answer: this.localDescription
                });
            });
        } else if (this.streamConfig.state === 'READY') {
            if (!this.readyHandled) {
                this.readyHandled = true;
                this.answerHandled = false;
                this.offerHandled = false;

                backoff(async () => {
                    if (this.destroyed) {
                        return;
                    }

                    if (!this.remoteDescription) {
                        console.log('[WEBRTC]: Handle ready (no remote set)');
                        let offer = this.streamConfig.sdp!;
                        await this.peerConnection.setRemoteDescription(offer);
                        this.remoteDescription = offer;

                        console.log('[WEBRTC]: Received answer');
                    }

                    if (this.onReady) {
                        this.onReady();
                    }

                    this.handleState();
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
                        console.log('INCOMING ICE:' + ice);
                        await this.peerConnection.addIceCandidate(ice);
                    });
                }
            }
        }
    }

    // TODO: move screen share to separate peer connection
    // WebRTC still can't detect stream/track removal, so we cant display ui prpperly :/
    onStreamAdded = (stream: AppMediaStream) => {
        console.warn('onStreamAdded', stream);
        if (!this.mainInStream) {
            this.mainInStream = stream;
        } else {
            if (this.contentInStream !== undefined) {
                this.contentInStream.close();
            }
            this.contentInStream = stream;
            this.notifyContentStream();
            stream.onClosed = () => {
                if (this.contentInStream === stream) {
                    this.contentInStream = undefined;
                }
                this.notifyContentStream();
            };
        }
    }

    addStream = (stream: AppMediaStream) => {
        if (this.outContentStream !== stream) {
            if (this.outContentStream) {
                this.outContentStream.close();
            }
            this.outContentStream = stream;
            console.warn('boom', this.id, 'adding stream', stream);
            this.peerConnection.addStream(stream);
        }
    }

    ////
    // IO
    ////
    getStream = () => {
        return this.stream;
    }
    getVideoStream = () => {
        return this.contentInStream;
    }
    getOutVideoStream = () => {
        return this.outContentStream;
    }

    getInStream = () => {
        return this.mainInStream;
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
        listener(this.contentInStream);
        return () => {
            this.contentStreamListeners.forEach(l => this.contentStreamListeners.delete(l));
        };
    }

    private notifyContentStream = () => {
        this.contentStreamListeners.forEach(l => l(this.contentInStream));
    }

}