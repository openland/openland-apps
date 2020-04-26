import { ConferenceMedia_conferenceMedia_streams } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';
import { backoff } from 'openland-y-utils/timer';
import { MediaSessionManager } from './MediaSessionManager';
import { InvalidateSync } from '@openland/patterns';

export class MediaStreamManager {
    // Identification
    private readonly id: string;
    private readonly session: MediaSessionManager;
    private readonly peerId: string;

    // Media
    private audioTrack: AppMediaStreamTrack | null = null;
    private videoTrack: AppMediaStreamTrack | null = null;
    private screencastTrack: AppMediaStreamTrack | null = null;

    // Peer connection
    private readonly peerConnection: AppPeerConnection;
    private currentConfig: ConferenceMedia_conferenceMedia_streams;

    // Negotiation
    private seq: number;
    private localDescription?: string;
    private remoteDescription?: string;
    private appliedCandidates = new Set<string>();
    private _invalidateSync: InvalidateSync;
    
    // State
    private destroyed = false;

    constructor(
        id: string,
        peerId: string,
        initialConfig: ConferenceMedia_conferenceMedia_streams,
        session: MediaSessionManager,
    ) {
        this.id = id;
        this.session = session;
        this.peerId = peerId;
        this.currentConfig = initialConfig;
        this.seq = -1;
        this._invalidateSync = new InvalidateSync(async () => {
            this.handleState(this.currentConfig);
        });

        // Create Peer Connection
        this.peerConnection = AppPeerConnectionFactory.createConnection({
            iceServers: session.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            iceTransportPolicy: this.currentConfig.settings.iceTransportPolicy || undefined,
        });

        // Handle Peer Connection candidates
        this.peerConnection.onicecandidate = (ev) => {
            backoff(async () => {
                if (this.destroyed) {
                    return;
                }

                if (ev.candidate) {
                    console.log('ICE:' + ev.candidate);
                    await this.session.client.mutateMediaCandidate({
                        id: this.id,
                        peerId: this.peerId,
                        candidate: ev.candidate
                    });
                }
            });
        };

        // Start sync
        this._invalidateSync.invalidate();
    }

    setAudioTrack(track: AppMediaStreamTrack | null) {
        this.audioTrack = track;
        // TODO: Update
    }

    setVideoTrack(track: AppMediaStreamTrack | null) {
        this.videoTrack = track;
        // TODO: Update
    }

    dispatch(config: ConferenceMedia_conferenceMedia_streams) {
        this.currentConfig = config;
        this._invalidateSync.invalidate();
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.peerConnection.close();
    }

    private handleState = async (streamConfig: ConferenceMedia_conferenceMedia_streams) => {
        // let seqBumped = false;
        // if (streamConfig.seq > this.seq) {
        //     this.seq = streamConfig.seq;
        //     this.streamConfig = streamConfig;
        //     seqBumped = true;
        // }

        // // this.updateVideoStream();

        // if (seqBumped) {
        //     if (this.streamConfig.state === 'NEED_OFFER') {
        //         this.localDescription = undefined;
        //         this.remoteDescription = undefined;
        //         await backoff(async () => {
        //             if (this.destroyed) {
        //                 return;
        //             }

        //             console.log('[WEBRTC]: Creating offer ' + streamConfig.seq);
        //             let offer = await this.peerConnection.createOffer();

        //             await this.peerConnection.setLocalDescription(offer);
        //             this.localDescription = offer;

        //             await this.client.mutateMediaOffer({
        //                 id: this.id,
        //                 peerId: this.peerId,
        //                 offer: this.localDescription,
        //                 seq: streamConfig.seq
        //             });
        //         });
        //     } else if (this.streamConfig.state === 'NEED_ANSWER') {
        //         this.localDescription = undefined;
        //         this.remoteDescription = undefined;

        //         await backoff(async () => {
        //             if (this.destroyed) {
        //                 return;
        //             }

        //             console.log('[WEBRTC]: Received offer ' + streamConfig.seq);
        //             // damn you chrome
        //             let offer = this.streamConfig.sdp!;
        //             await this.peerConnection.setRemoteDescription(offer);
        //             this.remoteDescription = offer;

        //             console.log('[WEBRTC]: Creating answer ' + streamConfig.seq);
        //             let answer = await this.peerConnection.createAnswer();
        //             await this.peerConnection.setLocalDescription(answer);
        //             this.localDescription = answer;

        //             await this.client.mutateMediaAnswer({
        //                 id: this.id,
        //                 peerId: this.peerId,
        //                 answer: this.localDescription,
        //                 seq: streamConfig.seq
        //             });
        //         });
        //     } else if (this.streamConfig.state === 'READY') {
        //         await backoff(async () => {
        //             if (this.destroyed) {
        //                 return;
        //             }

        //             if (!this.remoteDescription) {
        //                 console.log('[WEBRTC]: Received answer ' + streamConfig.seq);
        //                 let offer = this.streamConfig.sdp!;
        //                 await this.peerConnection.setRemoteDescription(offer);
        //                 this.remoteDescription = offer;
        //                 console.log('[WEBRTC]: Accepted answer ' + streamConfig.seq);
        //             }

        //             if (this.onReady) {
        //                 this.onReady();
        //             }

        //             if (this.pendingNegotiation) {
        //                 this.pendingNegotiation = false;
        //                 console.warn('[WEBRTC]: onnegotiationneeded ask from pend');
        //             }
        //         });
        //     }
        // }

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
}