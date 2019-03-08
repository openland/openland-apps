import * as React from 'react';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { Conference_conference_peers_connection, Conference_conference } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import {
    ConferenceCandidateMutation,
    ConferenceOfferMutation,
    ConferenceAnswerMutation,
} from 'openland-api';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

export interface TalkMediaStreamComponentProps {
    apollo: OpenApolloClient;
    ownPeerId: string;
    peerId: string;
    stream: AppMediaStream;
    connection: Conference_conference_peers_connection;
    conference: Conference_conference;
    // onStreamCreated: (peerId: string, stream: MediaStream) => void;
    // onStreamClosed: (peerId: string) => void;
}

export class ConferenceMediaActor extends React.Component<TalkMediaStreamComponentProps> {
    container = React.createRef<HTMLDivElement>();
    started = false;
    answerHandled = false;
    offerHandled = false;
    readyHandled = false;
    peerConnection!: AppPeerConnection;
    localDescription?: string;
    remoteDescription?: string;
    appliedCandidates = new Set<string>();
    audio: HTMLAudioElement[] = [];

    componentDidMount() {
        console.log('Connection mounted: ' + this.props.conference.id + ': ' + this.props.connection.state);
        console.log('WEBRTC: ICE Servers: ', this.props.conference.iceServers);
        this.started = true;
        this.peerConnection = AppPeerConnectionFactory.createConnection({
            iceServers: this.props.conference.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            iceTransportPolicy: 'relay',
        });
        this.peerConnection.onicecandidate = ev => {
            backoff(async () => {
                if (!this.started) {
                    return;
                }

                if (ev.candidate) {
                    console.log('ICE:' + ev.candidate);
                    await this.props.apollo.mutate(ConferenceCandidateMutation, {
                        id: this.props.conference.id,
                        peerId: this.props.peerId,
                        ownPeerId: this.props.ownPeerId,
                        candidate: ev.candidate,
                    });
                }
            });
        };
        this.peerConnection.addStream(this.props.stream);
        this.handleState();
    }
    componentDidUpdate() {
        console.log('Connection updated: ' + this.props.conference.id + ': ' + this.props.connection.state);
        this.handleState();
    }
    componentWillUnmount() {
        this.started = false;
        this.peerConnection.close();
        // this.props.onStreamClosed(this.props.peerId);
        console.log('Connection removed: ' + this.props.conference.id);
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
                    id: this.props.conference.id,
                    peerId: this.props.peerId,
                    ownPeerId: this.props.ownPeerId,
                    offer: this.localDescription,
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
                    let offer = this.props.connection.sdp!;
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
                    id: this.props.conference.id,
                    peerId: this.props.peerId,
                    ownPeerId: this.props.ownPeerId,
                    answer: this.localDescription,
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
                        let offer = this.props.connection.sdp!;
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
                            await this.peerConnection.addIceCandidate(ice);
                        });
                    }
                }
            }
        }
    }

    render() {
        return null;
    }
}
