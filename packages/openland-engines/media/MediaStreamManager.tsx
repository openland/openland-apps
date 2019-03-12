import { OpenlandClient } from 'openland-api/OpenlandClient';
import { ConferenceMedia_conferenceMedia_streams, ConferenceMedia_conferenceMedia_iceServers } from 'openland-api/Types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';

export class MediaStreamManager {
    private readonly id: string;
    private readonly client: OpenlandClient;
    private readonly peerId: string;
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

    constructor(
        client: OpenlandClient,
        id: string,
        peerId: string,
        iceServers: ConferenceMedia_conferenceMedia_iceServers[],
        stream: AppMediaStream,
        streamConfig: ConferenceMedia_conferenceMedia_streams
    ) {
        this.id = id;
        this.client = client;
        this.peerId = peerId;
        this.iceServers = iceServers;
        this.streamConfig = streamConfig;
        this.stream = stream;

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
                    })
                }
            });
        };
        this.peerConnection.addStream(this.stream);
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
}