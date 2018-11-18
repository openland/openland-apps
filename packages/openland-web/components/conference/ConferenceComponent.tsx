import 'webrtc-adapter';
import * as React from 'react';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api/ConferenceQuery';
import { XLoader } from 'openland-x/XLoader';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';
import { backoff, delay } from 'openland-y-utils/timer';
import { ConferenceFull } from 'openland-api/fragments/ConferenceFull';
import { UserShort } from 'openland-api/fragments/UserShort';
import { Conference_conference_peers_connection } from 'openland-api/Types';

let joinMutation = gql`
    mutation ConferenceJoin($id: ID!) {
        conferenceJoin(id: $id) {
            peerId
            conference {
                ...ConferenceFull
            }
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

let leaveMutation = gql`
    mutation ConferenceLeave($id: ID!, $peerId: ID!) {
        conferenceLeave(id: $id, peerId: $peerId) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

let offerMutation = gql`
    mutation ConferenceOffer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $offer: String!) {
        peerConnectionOffer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, offer: $offer) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

let answerMutation = gql`
    mutation ConferenceAnswer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $answer: String!) {
        peerConnectionAnswer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, answer: $answer) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

let candidatesMutation = gql`
    mutation ConferenceAnswer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $candidate: String!) {
        peerConnectionCandidate(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, candidate: $candidate) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

let keepAliveMutation = gql`
    mutation ConferenceKeepAlive($id: ID!, $peerId: ID!) {
        conferenceKeepAlive(id: $id, peerId: $peerId) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

let watchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

class ConferenceConnection extends React.Component<{
    apollo: OpenApolloClient,
    id: string, ownPeerId: string, peerId: string,
    stream: MediaStream,
    connection: Conference_conference_peers_connection
}> {

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
                urls: ['turn:35.185.221.195:3478?transport=tcp'],
                username: 'somecalluser',
                credential: 'samplepassword'
            }, {
                urls: ['stun:35.185.221.195:3478?transport=udp'],
                username: 'somecalluser',
                credential: 'samplepassword'
            }, {
                urls: ['stun:35.185.221.195:3478?transport=tcp'],
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

                    this.props.apollo.client.mutate({
                        mutation: candidatesMutation,
                        variables: {
                            id: this.props.id,
                            peerId: this.props.peerId,
                            ownPeerId: this.props.ownPeerId,
                            candidate: JSON.stringify(ev.candidate)
                        }
                    });
                }
            });
        };
        (this.peerConnection as any).ontrack = (ev: any) => {
            let audio = new Audio();
            audio.srcObject = ev.streams[0];
            audio.play();
            this.audio.push(audio);
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

                await this.props.apollo.client.mutate({
                    mutation: offerMutation, variables: {
                        id: this.props.id,
                        peerId: this.props.peerId,
                        ownPeerId: this.props.ownPeerId,
                        offer: JSON.stringify(this.localDescription)
                    }
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

                await this.props.apollo.client.mutate({
                    mutation: answerMutation, variables: {
                        id: this.props.id,
                        peerId: this.props.peerId,
                        ownPeerId: this.props.ownPeerId,
                        answer: JSON.stringify(this.localDescription)
                    }
                });
            });
        } else if (this.props.connection.state === 'READY') {
            if (this.readyHandled) {
                return;
            }
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
        return null;
    }
}

class ConferenceManager extends React.Component<{ apollo: OpenApolloClient, id: string, cid: string }, { peerId?: string, mediaStream?: MediaStream }> {
    private _mounted = true;
    private subs: any = null;

    constructor(props: { apollo: OpenApolloClient, id: string, cid: string }) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.subs = this.props.apollo.client.subscribe({ query: watchSubscription, variables: { id: this.props.id } })
            .subscribe({});
        backoff(async () => {
            let peerId = (await this.props.apollo.client.mutate({ mutation: joinMutation, variables: { id: this.props.id } })).data!.conferenceJoin.peerId as string;
            this.setState({ peerId });
            while (this._mounted) {
                await this.props.apollo.client.mutate({ mutation: keepAliveMutation, variables: { id: this.props.id, peerId } });
                await delay(2000);
            }
            this.props.apollo.client.mutate({ mutation: leaveMutation, variables: { id: this.props.id, peerId } });
        });

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            this.setState({ mediaStream: stream });
        });
    }

    componentWillUnmount() {
        this.subs.unsubscribe();
        this._mounted = false;
    }

    render() {
        return this.state.peerId && this.state.mediaStream ? (
            <YQuery query={ConferenceQuery} variables={{ id: this.props.cid }}>
                {data => {
                    let connections = data.data!.conference.peers.filter((v) => v.connection);
                    if (connections.length === 0) {
                        return null;
                    }
                    return (
                        <>
                            {connections.map((v) => (
                                <ConferenceConnection
                                    apollo={this.props.apollo}
                                    id={this.props.id}
                                    key={v.id}
                                    peerId={v.id}
                                    stream={this.state.mediaStream!}
                                    ownPeerId={this.state.peerId!}
                                    connection={v.connection!}
                                />
                            ))}
                        </>
                    );
                }}
            </YQuery>
        ) : null;
    }
}

export const ConferenceComponent = (props: { conversationId: string }) => {
    return (
        <YApolloContext.Consumer>
            {apollo => (
                <YQuery query={ConferenceQuery} variables={{ id: props.conversationId }}>
                    {data => {
                        if (data.loading) {
                            return <XLoader />;
                        }
                        console.log(data.data!.conference);
                        return (
                            <>
                                <ConferenceManager apollo={apollo!} id={data.data!.conference.id} cid={props.conversationId} />
                                <XVertical>
                                    {data.data!.conference.peers.map((v) => (
                                        <XVertical key={v.id}>
                                            <XHorizontal>{v.user.name}</XHorizontal>
                                            <XHorizontal>{v.connection ? v.connection.state : 'YOU'}</XHorizontal>
                                        </XVertical>
                                    ))}
                                </XVertical>
                            </>
                        );
                    }}
                </YQuery>
            )}
        </YApolloContext.Consumer>
    );
};