import { ConferenceMedia_conferenceMedia_streams, MediaKind, VideoSource } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection, AppRtpTransceiver } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { backoff } from 'openland-y-utils/timer';
import { MediaSessionManager } from './MediaSessionManager';
import { InvalidateSync } from '@openland/patterns';
import { OpenlandClient } from 'openland-api/spacex';

export class MediaConnectionManager {
    // Identification
    private readonly id: string;
    private readonly session: MediaSessionManager;
    private readonly client: OpenlandClient;
    private readonly peerId: string;

    // Media
    private audioTransceiver: AppRtpTransceiver | null = null;
    private audioTrack: AppMediaStreamTrack | null = null;
    private videoTransceiver: AppRtpTransceiver | null = null;
    private videoTrack: AppMediaStreamTrack | null = null;
    private screencastTransceiver: AppRtpTransceiver | null = null;
    private screencastTrack: AppMediaStreamTrack | null = null;

    // Peer connection
    private readonly peerConnection: AppPeerConnection;
    private currentConfig: ConferenceMedia_conferenceMedia_streams;

    // Negotiation
    private seq: number;
    private localDescriptionSet: boolean = false;
    private remoteDescriptionSet: boolean = false;

    private localOfferSent: boolean = false;
    private localOffer: string | null = null;
    private localAnswerSent: boolean = false;
    private localAnswer: string | null = null;
    private appliedCandidates = new Set<string>();
    private invalidateSync: InvalidateSync;

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
        this.client = session.client;
        this.invalidateSync = new InvalidateSync(async () => {
            this.handleState(this.currentConfig);
        });

        // Create Peer Connection
        let iceTransportPolicy: 'relay' | 'all' | undefined = undefined;
        if (this.currentConfig.iceTransportPolicy === 'ALL') {
            iceTransportPolicy = 'all';
        }
        if (this.currentConfig.iceTransportPolicy === 'RELAY') {
            iceTransportPolicy = 'relay';
        }
        this.peerConnection = AppPeerConnectionFactory.createConnection({
            iceServers: this.currentConfig.iceTransportPolicy !== 'NONE' ? session.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })) : [],
            iceTransportPolicy: iceTransportPolicy,
        });

        // ICE Candidates if transport policy is not NONE
        if (this.currentConfig.iceTransportPolicy !== 'NONE') {
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
        }

        // Start sync
        this.invalidateSync.invalidate();
    }

    setAudioTrack(track: AppMediaStreamTrack | null) {
        if (track && track.kind !== 'audio') {
            throw Error('Expected audio track, got: ' + track.kind);
        }
        this.audioTrack = track;
        if (this.audioTransceiver) {
            this.audioTransceiver.sender.replaceTrack((track as any).raw);
        }
    }

    setVideoTrack(track: AppMediaStreamTrack | null) {
        if (track && track.kind !== 'video') {
            throw Error('Expected video track, got: ' + track.kind);
        }
        this.videoTrack = track;
        if (this.videoTransceiver) {
            this.videoTransceiver.sender.replaceTrack((track as any).raw);
        }
    }

    dispatch(config: ConferenceMedia_conferenceMedia_streams) {
        this.currentConfig = config;
        this.invalidateSync.invalidate();
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.peerConnection.close();
    }

    private handleState = async (config: ConferenceMedia_conferenceMedia_streams) => {
        // Old config? How it is possible?
        if (config.seq < this.seq) {
            return;
        }

        if (config.state === 'NEED_OFFER') {

            //
            // Detect if negotiation restarted
            //
            if (config.seq > this.seq) {
                this.localOfferSent = false;
                this.localAnswerSent = false;
                this.localOffer = null;
                this.localAnswer = null;
            }
            this.seq = config.seq;

            //
            // Configure and create offer
            //
            if (!this.localOffer) {

                //
                // Creating required transceivers if needed
                // NOTE: Only offerrer side is responsible for this 
                //       and we expect answerer to just confirm offer
                //
                let hasAudio = false;
                for (let sender of config.senders) {
                    if (sender.kind === MediaKind.AUDIO) {
                        // Audio track
                        if (hasAudio) {
                            // Ignoring multiple audio senders for future compatibility
                            continue;
                        }
                        hasAudio = true;

                        // Create if needed
                        if (!this.audioTransceiver) {
                            this.audioTransceiver = await this.peerConnection.addTranseiver('audio', { direction: 'sendonly' });
                            if (this.audioTrack) {
                                this.audioTransceiver.sender.replaceTrack(this.audioTrack);
                            }
                        }
                    } else if (sender.kind === MediaKind.VIDEO) {
                        if (sender.videoSource === VideoSource.CAMERA || sender.videoSource === null) {
                            // Camera
                        } else if (sender.videoSource === VideoSource.SCREEN) {
                            // Screen
                        }
                    }
                }
                // Disable audio transceiver if not sending any audio
                if (!hasAudio && this.audioTransceiver) {
                    this.audioTransceiver.direction = 'inactive';
                }

                // Create Offer
                console.log('[WEBRTC]: Creating offer');
                let offer = await this.peerConnection.createOffer();
                await this.peerConnection.setLocalDescription(offer);
                this.localDescriptionSet = true;
                this.localOffer = offer;
            }

            if (!this.localOfferSent) {
                await this.client.mutateMediaOffer({
                    id: this.id,
                    peerId: this.peerId,
                    offer: this.localOffer,
                    seq: config.seq
                });
                this.localOfferSent = true;
            }
        } else if (config.state === 'NEED_ANSWER') {
            //
        } else if (config.state === 'READY') {
            //
        }
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
        if (this.remoteDescriptionSet && this.localDescriptionSet) {
            for (let ice of config.ice) {
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