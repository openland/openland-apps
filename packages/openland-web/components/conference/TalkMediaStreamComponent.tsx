import * as React from 'react';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { Conference_conference_peers_connection } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ConferenceCandidateMutation, ConferenceOfferMutation, ConferenceAnswerMutation } from 'openland-api';

export interface TalkMediaStreamComponentProps {
    apollo: OpenApolloClient;
    id: string;
    ownPeerId: string;
    peerId: string;
    stream: MediaStream;
    connection: Conference_conference_peers_connection;
}

export class TalkMediaStreamComponent extends React.Component<TalkMediaStreamComponentProps> {
    container = React.createRef<HTMLDivElement>();
    started = false;
    answerHandled = false;
    offerHandled = false;
    readyHandled = false;
    peerConnection!: RTCPeerConnection;
    localDescription?: RTCSessionDescriptionInit;
    remoteDescription?: RTCSessionDescriptionInit;
    appliedCandidates = new Set<string>();
    audio: HTMLAudioElement[] = [];

    componentDidMount() {
        console.log('Connection mounted: ' + this.props.id + ': ' + this.props.connection.state);
        this.started = true;
        this.peerConnection = new RTCPeerConnection({
            iceServers: [{
                urls: ['turn:35.185.221.195:3478?transport=udp'],
                username: 'somecalluser',
                credential: 'samplepassword'
            }, {
                urls: ['stun:35.185.221.195:3478?transport=udp'],
                username: 'somecalluser',
                credential: 'samplepassword'
            }]
        });
        this.peerConnection.onicecandidate = (ev) => {
            backoff(async () => {
                if (!this.started) {
                    return;
                }

                if (ev.candidate) {
                    console.log('ICE:' + JSON.stringify(ev.candidate));
                    await this.props.apollo.mutate(ConferenceCandidateMutation, {
                        id: this.props.id,
                        peerId: this.props.peerId,
                        ownPeerId: this.props.ownPeerId,
                        candidate: JSON.stringify(ev.candidate)
                    });
                }
            });
        };
        (this.peerConnection as any).ontrack = (ev: any) => {
            let audio = new Audio();
            audio.autoplay = true;
            audio.setAttribute('playsinline', 'true');
            audio.controls = false;
            audio.srcObject = ev.streams[0];
            this.container.current!.appendChild(audio);
        };
        for (let t of this.props.stream.getTracks()) {
            (this.peerConnection as any).addTrack(t, this.props.stream);
        }
        this.handleState();
    }
    componentDidUpdate() {
        console.log('Connection updated: ' + this.props.id + ': ' + this.props.connection.state);
        this.handleState();
    }
    componentWillUnmount() {
        this.started = false;
        this.peerConnection.close();
        console.log('Connection removed: ' + this.props.id);
    }

    handleState() {
        if (this.props.connection.state === 'NEED_OFFER') {
            if (this.offerHandled) {
                return;
            }
            this.offerHandled = true;
            backoff(async () => {
                if (!this.started) {
                    return;
                }

                if (!this.localDescription) {
                    let offer = await this.peerConnection.createOffer();
                    await this.peerConnection.setLocalDescription(offer);
                    this.localDescription = offer;
                }

                await this.props.apollo.mutate(ConferenceOfferMutation, {
                    id: this.props.id,
                    peerId: this.props.peerId,
                    ownPeerId: this.props.ownPeerId,
                    offer: JSON.stringify(this.localDescription)
                });
            });
        } else if (this.props.connection.state === 'NEED_ANSWER') {
            if (this.answerHandled) {
                return;
            }
            this.answerHandled = true;

            backoff(async () => {
                if (!this.started) {
                    return;
                }

                if (!this.remoteDescription) {
                    let offer = JSON.parse(this.props.connection.sdp!);
                    await this.peerConnection.setRemoteDescription(offer);
                    this.remoteDescription = offer;
                }

                if (!this.localDescription) {
                    let answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.localDescription = answer;
                }

                this.handleState();

                await this.props.apollo.mutate(ConferenceAnswerMutation, {
                    id: this.props.id,
                    peerId: this.props.peerId,
                    ownPeerId: this.props.ownPeerId,
                    answer: JSON.stringify(this.localDescription)
                });
            });
        } else if (this.props.connection.state === 'READY') {
            if (!this.readyHandled) {
                this.readyHandled = true;

                backoff(async () => {
                    if (!this.started) {
                        return;
                    }

                    if (!this.remoteDescription) {
                        let offer = JSON.parse(this.props.connection.sdp!);
                        await this.peerConnection.setRemoteDescription(offer);
                        this.remoteDescription = offer;
                    }

                    this.handleState();
                });
            }

            // Apply ICE
            if (this.remoteDescription && this.localDescription) {
                for (let ice of this.props.connection.ice) {
                    if (!this.appliedCandidates.has(ice)) {
                        this.appliedCandidates.add(ice);
                        backoff(async () => {
                            if (!this.started) {
                                return;
                            }
                            console.log('INCOMING ICE:' + ice);
                            await this.peerConnection.addIceCandidate(JSON.parse(ice));
                        });
                    }
                }
            }
        }
    }

    render() {
        return <div ref={this.container} />;
    }
}