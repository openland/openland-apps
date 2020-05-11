import { ConferenceMedia_conferenceMedia_streams, MediaKind, VideoSource, MediaStreamHint, MediaDirection } from 'openland-api/spacex.types';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection, AppRtpTransceiver, AppSessionDescription } from 'openland-y-runtime-api/AppPeerConnectionApi';
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
    private receivers = new Map<string, Map<'audio' | 'video' | 'screencast', AppRtpTransceiver>>();

    // Peer connection
    private readonly peerConnection: AppPeerConnection;
    private currentConfig: ConferenceMedia_conferenceMedia_streams;

    // Negotiation
    private seq: number;
    private appliedCandidates = new Set<string>();
    private invalidateSync: InvalidateSync;
    private localDescriptionSet: boolean = false;
    private remoteDescriptionSet: boolean = false;

    private localOfferSent: boolean = false;
    private localOffer: AppSessionDescription | null = null;
    private remoteOffer: AppSessionDescription | null = null;

    private localAnswerSent: boolean = false;
    private localAnswer: AppSessionDescription | null = null;
    private remoteAnwer: AppSessionDescription | null = null;

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
            await this.handleState(this.currentConfig);
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
                        // console.log('ICE:' + ev.candidate);
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
            this.audioTransceiver.sender.replaceTrack(track);
        }
    }

    setVideoTrack(track: AppMediaStreamTrack | null) {
        if (track && track.kind !== 'video') {
            throw Error('Expected video track, got: ' + track.kind);
        }
        this.videoTrack = track;
        if (this.videoTransceiver) {
            this.videoTransceiver.sender.replaceTrack(track);
        }
    }
    setScreencastTrack(track: AppMediaStreamTrack | null) {
        if (track && track.kind !== 'video') {
            throw Error('Expected video track, got: ' + track.kind);
        }
        this.screencastTrack = track;
        if (this.screencastTransceiver) {
            this.screencastTransceiver.sender.replaceTrack(track);
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

        // detach session peer receivers
        for (let [peerId, receivers] of this.receivers.entries()) {
            for (let kind of receivers.keys()) {
                this.session.attachPeerReceiver(peerId, kind, null);
            }
        }

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
                this.remoteAnwer = null;
                this.remoteOffer = null;
            }
            this.seq = config.seq;

            //
            // Configure and create offer
            //
            if (!this.localOffer) {

                // Configure transceivers
                await this.prepareTransceivers(config);
                await this.configureReceivers(config);
                await this.configureSenders(config);

                // Attach receivers to peers in session
                this.attachSessionReceivers(config);

                // Create Offer
                console.log('[WEBRTC]: Creating offer');
                let offer = await this.peerConnection.createOffer();
                console.log(offer.sdp);
                await this.peerConnection.setLocalDescription(offer);
                this.localDescriptionSet = true;
                this.localOffer = offer;

                // Log mids
                if (this.audioTransceiver) {
                    console.log('[WEBRTC]: Send Audio MID: ' + this.audioTransceiver.mid);
                }
                if (this.videoTransceiver) {
                    console.log('[WEBRTC]: Send Video MID: ' + this.videoTransceiver.mid);
                }
                if (this.screencastTransceiver) {
                    console.log('[WEBRTC]: Send Screencast MID: ' + this.screencastTransceiver.mid);
                }

                for (let peerId of this.receivers.keys()) {
                    let refs = this.receivers.get(peerId)!;
                    for (let kind of refs.keys()) {
                        console.log('[WEBRTC]: Receive ' + peerId + ':' + kind + ':' + refs.get(kind)!.mid);
                    }
                }
            }

            if (!this.localOfferSent) {
                let hints: MediaStreamHint[] = [];
                if (this.audioTransceiver && this.audioTransceiver.mid) {
                    hints.push({
                        kind: MediaKind.AUDIO,
                        direction: MediaDirection.SEND,
                        mid: this.audioTransceiver.mid
                    });
                }
                if (this.videoTransceiver && this.videoTransceiver.mid) {
                    hints.push({
                        kind: MediaKind.VIDEO,
                        videoSource: VideoSource.CAMERA,
                        direction: MediaDirection.SEND,
                        mid: this.videoTransceiver.mid
                    });
                }
                if (this.screencastTransceiver && this.screencastTransceiver.mid) {
                    hints.push({
                        kind: MediaKind.VIDEO,
                        videoSource: VideoSource.SCREEN,
                        direction: MediaDirection.SEND,
                        mid: this.screencastTransceiver.mid
                    });
                }
                for (let peerId of this.receivers.keys()) {
                    let refs = this.receivers.get(peerId)!;
                    for (let kind of refs.keys()) {
                        let tr = refs.get(kind)!;
                        if (kind === 'audio' && tr.mid) {
                            hints.push({
                                peerId,
                                kind: MediaKind.AUDIO,
                                direction: MediaDirection.RECEIVE,
                                mid: tr.mid
                            });
                        }
                        if (kind === 'video' && tr.mid) {
                            hints.push({
                                peerId,
                                kind: MediaKind.VIDEO,
                                videoSource: VideoSource.CAMERA,
                                direction: MediaDirection.RECEIVE,
                                mid: tr.mid
                            });
                        }
                        if (kind === 'screencast' && tr.mid) {
                            hints.push({
                                peerId,
                                kind: MediaKind.VIDEO,
                                videoSource: VideoSource.SCREEN,
                                direction: MediaDirection.RECEIVE,
                                mid: tr.mid
                            });
                        }
                    }
                }
                await this.client.mutateMediaOffer({
                    id: this.id,
                    peerId: this.peerId,
                    offer: JSON.stringify(this.localOffer),
                    seq: config.seq,
                    hints: hints
                });
                this.localOfferSent = true;
            }
        } else if (config.state === 'NEED_ANSWER') {
            //
            // Detect if negotiation restarted
            //
            if (config.seq > this.seq) {
                this.localOfferSent = false;
                this.localAnswerSent = false;
                this.localOffer = null;
                this.localAnswer = null;
                this.remoteOffer = null;
                this.remoteAnwer = null;
            }
            this.seq = config.seq;

            // Apply remote description
            if (!this.remoteOffer) {
                console.log('[WEBRTC]: Got offer');
                let offer = JSON.parse(config.sdp!);
                await this.peerConnection.setRemoteDescription(offer);
                this.remoteDescriptionSet = true;
                this.remoteOffer = offer;
            }

            // Handle senders
            console.log('[WEBRTC]: transceivers');
            await this.extractTransceivers(config);
            // Dynamically created senders have invalid state. We have to reconfigure them.
            await this.configureSenders(config);

            // Attach receivers to peers in session
            this.attachSessionReceivers(config);

            // Generate answer
            if (!this.localAnswer) {
                console.log('[WEBRTC]: Creating answer');
                let answer = await this.peerConnection.createAnswer();
                console.log(answer.sdp);
                await this.peerConnection.setLocalDescription(answer);
                this.localDescriptionSet = true;
                this.localAnswer = answer;
            }

            // Send answer
            if (!this.localAnswerSent) {
                await this.client.mutateMediaAnswer({
                    id: this.id,
                    peerId: this.peerId,
                    answer: JSON.stringify(this.localAnswer),
                    seq: config.seq
                });
            }
        } else if (config.state === 'READY') {
            this.seq = config.seq;

            if (!this.remoteAnwer && !this.remoteOffer) {
                let answer = JSON.parse(config.sdp!);
                console.log('[WEBRTC]: Received answer');
                console.log(answer.sdp);
                await this.peerConnection.setRemoteDescription(answer);
                this.remoteDescriptionSet = true;
                this.remoteAnwer = answer;
            }
        }

        // Apply ICE
        if (this.remoteDescriptionSet && this.localDescriptionSet) {
            for (let ice of config.ice) {
                if (!this.appliedCandidates.has(ice)) {
                    this.appliedCandidates.add(ice);
                    backoff(async () => {
                        if (this.destroyed) {
                            return;
                        }
                        // console.log('[WEBRTC]: INCOMING ICE:' + ice);
                        await this.peerConnection.addIceCandidate(ice);
                    });
                }
            }
        }
    }

    private prepareTransceivers = async (config: ConferenceMedia_conferenceMedia_streams) => {

        //
        // Creating trascievers and configuring them before 
        // making an offer
        //
        // NOTE: This code expects that in every connection
        //       one of the sides are leader that always makes
        //       offers and other, secondady, peer can only
        //       generate anwers.
        //
        //       Mesh and SFU schedulers are both follow 
        //       this constraint.
        //
        //

        //
        // Create missing senders
        //

        for (let sender of config.senders) {
            if (sender.kind === MediaKind.AUDIO) {
                await this.createAudioSenderTransceiverIfNeeded();
            } else if (sender.kind === MediaKind.VIDEO) {
                // NOTE: Do not change this condition. We tread null video source as camera one
                //       for future compatibility
                if (sender.videoSource === VideoSource.CAMERA || sender.videoSource === null) {
                    await this.createVideoSenderTransceiverIfNeeded();
                } else if (sender.videoSource === VideoSource.SCREEN) {
                    await this.createScreencastSenderTransceiverIfNeeded();
                }
            }
        }

        //
        // Create missing receivers
        //

        for (let receiver of config.receivers) {
            // Not supporting detached receivers for now
            if (!receiver.peerId) {
                continue;
            }
            if (receiver.kind === MediaKind.AUDIO) {
                await this.createAudioReceiverIfNeeded(receiver.peerId);
            } else if (receiver.kind === MediaKind.VIDEO) {
                // NOTE: Do not change this condition. We tread null video source as camera one
                //       for future compatibility
                if (receiver.videoSource === VideoSource.CAMERA || receiver.videoSource === null) {
                    await this.createVideoReceiverIfNeeded(receiver.peerId);
                } else if (receiver.videoSource === VideoSource.SCREEN) {
                    await this.createScreencastReceiverIfNeeded(receiver.peerId);
                }
            }
        }
    }

    private configureReceivers = async (config: ConferenceMedia_conferenceMedia_streams) => {
        for (let peerId of this.receivers.keys()) {
            let refs = this.receivers.get(peerId)!;
            for (let kind of refs.keys()) {
                let transceiver = refs.get(kind)!;
                if (kind === 'audio') {
                    if (config.receivers.find((r) => r.peerId === peerId && r.kind === MediaKind.AUDIO)) {
                        transceiver.direction = 'recvonly';
                    } else {
                        transceiver.direction = 'inactive';
                    }
                } else if (kind === 'video') {
                    if (config.receivers.find((r) => r.peerId === peerId && r.kind === MediaKind.VIDEO && (
                        r.videoSource === null || r.videoSource === VideoSource.CAMERA
                    ))) {
                        transceiver.direction = 'recvonly';
                    } else {
                        transceiver.direction = 'inactive';
                    }
                } else if (kind === 'screencast') {
                    if (config.receivers.find((r) => r.peerId === peerId && r.kind === MediaKind.VIDEO &&
                        r.videoSource === VideoSource.SCREEN
                    )) {
                        transceiver.direction = 'recvonly';
                    } else {
                        transceiver.direction = 'inactive';
                    }
                }
            }
        }
    }

    private configureSenders = async (config: ConferenceMedia_conferenceMedia_streams) => {
        if (this.audioTransceiver) {
            if (config.senders.find((s) => s.kind === MediaKind.AUDIO)) {
                console.log('[WEBRTC]: set direction: sendonly');
                this.audioTransceiver.direction = 'sendonly';
            } else {
                console.log('[WEBRTC]: set direction: inactive');
                this.audioTransceiver.direction = 'inactive';
            }
        }
        if (this.videoTransceiver) {
            if (config.senders.find((s) => s.kind === MediaKind.VIDEO && s.videoSource === null || s.videoSource === VideoSource.CAMERA)) {
                this.videoTransceiver.direction = 'sendonly';
            } else {
                this.videoTransceiver.direction = 'inactive';
            }
        }
        if (this.screencastTransceiver) {
            if (config.senders.find((s) => s.kind === MediaKind.VIDEO && s.videoSource === VideoSource.SCREEN)) {
                this.screencastTransceiver.direction = 'sendonly';
            } else {
                this.screencastTransceiver.direction = 'inactive';
            }
        }
    }

    private extractTransceivers = async (config: ConferenceMedia_conferenceMedia_streams) => {
        let transceivers = this.peerConnection.getTransceivers();
        console.log('[WEBRTC]: Transceivers');
        for (let t of transceivers) {
            console.log(t.id + ': ' + t.direction + ', ' + t.mid);
        }
        console.log('[WEBRTC]: Config');
        console.log(JSON.stringify(config));

        // Check audio sender
        if (!this.audioTransceiver) {
            const audioSender = config.senders.find((v) => v.kind === MediaKind.AUDIO);
            if (audioSender && audioSender.mid) {
                let at = transceivers.find((tr) => tr.mid === audioSender.mid);
                if (at) {
                    this.audioTransceiver = at;
                    console.log('[WEBRTC]: Found audio track: ' + audioSender.mid);
                    if (this.audioTrack) {
                        at.sender.replaceTrack(this.audioTrack);
                    }
                }
            }
        }

        // Check video sender
        if (!this.videoTransceiver) {
            const videoSender = config.senders.find((v) => v.kind === MediaKind.VIDEO && (v.videoSource === null || v.videoSource === VideoSource.CAMERA));
            if (videoSender && videoSender.mid) {
                let at = transceivers.find((tr) => tr.mid === videoSender.mid);
                if (at) {
                    this.videoTransceiver = at;
                    console.log('[WEBRTC]: Found video track: ' + videoSender.mid);
                    if (this.videoTrack) {
                        at.sender.replaceTrack(this.videoTrack);
                    }
                }
            }
        }

        // Check screencast sender
        if (!this.screencastTransceiver) {
            const screencastSender = config.senders.find((v) => v.kind === MediaKind.VIDEO && v.videoSource === VideoSource.SCREEN);
            if (screencastSender && screencastSender.mid) {
                let at = transceivers.find((tr) => tr.mid === screencastSender.mid);
                if (at) {
                    this.screencastTransceiver = at;
                    console.log('[WEBRTC]: Found screencast track: ' + screencastSender.mid);
                    if (this.screencastTrack) {
                        at.sender.replaceTrack(this.screencastTrack);
                    }
                }
            }
        }

        for (let receiver of config.receivers) {
            if (!receiver.peerId) {
                continue;
            }
            if (!receiver.mid) {
                continue;
            }
            if (!this.receivers.has(receiver.peerId)) {
                this.receivers.set(receiver.peerId, new Map());
            }
            let refs = this.receivers.get(receiver.peerId)!;
            if (receiver.kind === MediaKind.AUDIO) {
                if (!refs.has('audio')) {
                    let at = transceivers.find((tr) => tr.mid === receiver.mid);
                    if (at) {
                        refs.set('audio', at);
                    }
                }
            } else if (receiver.kind === MediaKind.VIDEO && (receiver.videoSource === null || receiver.videoSource === VideoSource.CAMERA)) {
                if (!refs.has('video')) {
                    let at = transceivers.find((tr) => tr.mid === receiver.mid);
                    if (at) {
                        refs.set('video', at);
                    }
                }
            } else if (receiver.kind === MediaKind.VIDEO && receiver.videoSource === VideoSource.SCREEN) {
                if (!refs.has('screencast')) {
                    let at = transceivers.find((tr) => tr.mid === receiver.mid);
                    if (at) {
                        refs.set('screencast', at);
                    }
                }
            }
        }
    }

    private attachSessionReceivers = (config: ConferenceMedia_conferenceMedia_streams) => {
        for (let [peerId, receivers] of this.receivers.entries()) {
            for (let [kind, receiver] of receivers.entries()) {
                let enabled = false;
                if (kind === 'audio') {
                    enabled = !!config.receivers.find(r => r.peerId === peerId && r.kind === MediaKind.AUDIO);
                } else if (kind === 'video') {
                    enabled = !!config.receivers.find((r) => r.peerId === peerId && r.kind === MediaKind.VIDEO && (
                        r.videoSource === null || r.videoSource === VideoSource.CAMERA
                    ));
                } else if (kind === 'screencast') {
                    enabled = !!config.receivers.find((r) => r.peerId === peerId && r.kind === MediaKind.VIDEO &&
                        r.videoSource === VideoSource.SCREEN
                    );
                }
                this.session.attachPeerReceiver(peerId, kind, enabled ? receiver.receiver.track : null);
            }
        }
    }

    private createAudioReceiverIfNeeded = async (peerId: string) => {
        if (!this.receivers.has(peerId)) {
            this.receivers.set(peerId, new Map());
        }
        let refs = this.receivers.get(peerId)!;
        if (!refs.has('audio')) {
            let transceiver = await this.peerConnection.addTransceiver('audio', { direction: 'recvonly' });
            refs.set('audio', transceiver);
        }
    }

    private createVideoReceiverIfNeeded = async (peerId: string) => {
        if (!this.receivers.has(peerId)) {
            this.receivers.set(peerId, new Map());
        }
        let refs = this.receivers.get(peerId)!;
        if (!refs.has('video')) {
            let transceiver = await this.peerConnection.addTransceiver('video', { direction: 'recvonly' });
            refs.set('video', transceiver);
        }
    }

    private createScreencastReceiverIfNeeded = async (peerId: string) => {
        if (!this.receivers.has(peerId)) {
            this.receivers.set(peerId, new Map());
        }
        let refs = this.receivers.get(peerId)!;
        if (!refs.has('screencast')) {
            let transceiver = await this.peerConnection.addTransceiver('video', { direction: 'recvonly' });
            refs.set('screencast', transceiver);
        }
    }

    private createAudioSenderTransceiverIfNeeded = async () => {
        // Create if needed
        if (!this.audioTransceiver) {
            this.audioTransceiver = await this.peerConnection.addTransceiver('audio', { direction: 'sendonly' });
            if (this.audioTrack) {
                this.audioTransceiver.sender.replaceTrack(this.audioTrack);
            }
        }
    }

    private createVideoSenderTransceiverIfNeeded = async () => {
        // Create if needed
        if (!this.videoTransceiver) {
            this.videoTransceiver = await this.peerConnection.addTransceiver('video', { direction: 'sendonly' });
            if (this.videoTrack) {
                this.videoTransceiver.sender.replaceTrack(this.videoTrack);
            }
        }
    }

    private createScreencastSenderTransceiverIfNeeded = async () => {
        // Create if needed
        if (!this.screencastTransceiver) {
            this.screencastTransceiver = await this.peerConnection.addTransceiver('video', { direction: 'sendonly' });
            if (this.screencastTrack) {
                this.screencastTransceiver.sender.replaceTrack(this.screencastTrack);
            }
        }
    }
}