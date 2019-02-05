import * as React from 'react';
import { mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { Conference_conference_peers_connection, Conference_conference } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { delay, backoff } from 'openland-y-utils/timer';

interface CallMediaStreamProps {
    id: string;
    ownPeerId: string;
    peerId: string;
    stream: MediaStream;
    connection: Conference_conference_peers_connection;
    conference: Conference_conference;
}

class CallMediaStreamComponent extends React.PureComponent<CallMediaStreamProps> {
    peerConnection!: any
    started = false;
    answerHandled = false;
    offerHandled = false;
    readyHandled = false;
    localDescription?: any;
    remoteDescription?: any;
    appliedCandidates = new Set<string>();

    componentWillMount() {
        console.log('WEBRTC: Connection added: ' + this.props.id);
        this.started = true;
        this.peerConnection = new RTCPeerConnection({
            iceServers: this.props.conference.iceServers.map(v => ({
                urls: v.urls,
                credential: v.credential ? v.credential : undefined,
                username: v.username ? v.username : undefined,
            })),
            // iceTransportPolicy: 'relay',
        });

        this.peerConnection.onicecandidate = (ev: any) => {
            console.log('WEBRTC: ICE:' + JSON.stringify(ev.candidate));
            backoff(async () => {
                if (!this.started) {
                    return;
                }

                if (ev.candidate) {
                    await getClient().mutateConferenceCandidate({
                        id: this.props.id,
                        peerId: this.props.peerId,
                        ownPeerId: this.props.ownPeerId,
                        candidate: JSON.stringify(ev.candidate),
                    });
                }
            });
        };

        (this.peerConnection as any).onaddstream = (event: any) => {
            console.log('WEBRTC: Stream received');
            console.log(event.stream);
            // Handle?
        };

        // (this.peerConnection as any).oniceconnectionstatechange = function (event: any) {
        //     console.log('WEBRTC: oniceconnectionstatechange', event.target.iceConnectionState);
        // };

        (this.peerConnection as any).addStream(this.props.stream);

        // (this.peerConnection as any).ontrack = (ev: any) => {
        //     if (!this.started) {
        //         return;
        //     }
        //     // let audio = new Audio();
        //     // audio.autoplay = true;
        //     // audio.setAttribute('playsinline', 'true');
        //     // audio.controls = false;
        //     // audio.srcObject = ev.streams[0];
        //     // this.container.current!.appendChild(audio);
        //     // this.props.onStreamCreated(this.props.peerId, ev.streams[0]);
        // };
        // for (let t of this.props.stream.getTracks()) {
        //     (this.peerConnection as any).addTrack(t, this.props.stream);
        // }
    }

    private handleState = () => {
        if (this.props.connection.state === 'NEED_OFFER') {
            if (this.offerHandled) {
                return;
            }
            this.offerHandled = true;
            console.log('WEBRTC: NEED OFFER received');
            backoff(async () => {
                if (!this.started) {
                    return;
                }

                if (!this.localDescription) {
                    let offer = await this.peerConnection.createOffer();
                    await this.peerConnection.setLocalDescription(offer);
                    this.localDescription = offer;
                }

                console.log('WEBRTC: Sending offer');
                await getClient().mutateConferenceOffer({
                    id: this.props.id,
                    peerId: this.props.peerId,
                    ownPeerId: this.props.ownPeerId,
                    offer: JSON.stringify(this.localDescription),
                });

                console.log('WEBRTC: Offer sent');
            });
        } else if (this.props.connection.state === 'NEED_ANSWER') {
            if (this.answerHandled) {
                return;
            }
            this.answerHandled = true;
            console.log('WEBRTC: NEED ANSWER received');
            backoff(async () => {
                if (!this.started) {
                    return;
                }

                console.log('WEBRTC: 1');
                if (!this.remoteDescription) {
                    console.log('WEBRTC: 12');
                    let offer = new RTCSessionDescription(JSON.parse(this.props.connection.sdp!));
                    console.log('WEBRTC: 13');
                    await this.peerConnection.setRemoteDescription(offer);
                    console.log('WEBRTC: 14');
                    this.remoteDescription = offer;
                    console.log('WEBRTC: 15');
                }
                console.log('WEBRTC: 2');

                if (!this.localDescription) {
                    let answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.localDescription = answer;
                }

                console.log('WEBRTC: 3');

                this.handleState();

                console.log('WEBRTC: Sending answer');
                await getClient().mutateConferenceAnswer({
                    id: this.props.id,
                    peerId: this.props.peerId,
                    ownPeerId: this.props.ownPeerId,
                    answer: JSON.stringify(this.localDescription),
                });
                console.log('WEBRTC: Answer sent');
            });
        } else if (this.props.connection.state === 'READY') {
            if (!this.readyHandled) {
                this.readyHandled = true;

                backoff(async () => {
                    if (!this.started) {
                        return;
                    }

                    if (!this.remoteDescription) {
                        let offer = new RTCSessionDescription(JSON.parse(this.props.connection.sdp!));
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
                            console.log('WEBRTC: INCOMING ICE:' + ice);
                            await this.peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(ice)));
                        });
                    }
                }
            }
        }
    }

    componentDidUpdate() {
        this.handleState();
    }

    componentWillUnmount() {
        this.started = false;
        this.peerConnection!!.close();
        console.log('WEBRTC: Connection removed: ' + this.props.id);
    }

    render() {
        // if (this.state.stream) {
        //     return (<RTCView streamURL={this.state.stream!!.toURL()} />)
        // }
        return null;
    }
}

export const CallController = React.memo<{ id: string, conference: Conference_conference }>((props) => {
    let conference = props.conference;
    let [stream, setStream] = React.useState<any>(null);

    React.useEffect(() => {
        var mounted = true;
        var _lstream: any = null;
        (async () => {
            console.log('Calls: requesting media');
            let _stream = await mediaDevices.getUserMedia({ audio: true, video: false });
            if (!mounted) {
                console.log('Calls: media requested after call closed');
                for (let t of _stream.getTracks()) {
                    t.stop();
                }
            } else {
                console.log('Calls: media requested');
                _lstream = _stream;
                setStream(_stream);
            }
        })();
        return () => {
            mounted = false;
            if (_lstream) {
                for (let t of _lstream.getTracks()) {
                    t.stop();
                }
            }
        }
    }, []);

    let [ownPeerId, setOwnPeerId] = React.useState<string | null>(null)

    React.useEffect(() => {
        var mounted = true;
        let peerId: string = '';
        (async () => {
            while (mounted) {
                try {
                    peerId = (await getClient().mutateConferenceJoin({ id: conference.id })).conferenceJoin.peerId;
                    setOwnPeerId(peerId);
                    await delay(2000);
                    break;
                } catch (e) {
                    console.warn(e);
                }
            }
            while (mounted) {
                try {
                    await getClient().mutateConferenceKeepAlive({ id: conference.id, peerId });
                    await delay(2000);
                } catch (e) {
                    console.warn(e);
                }
            }
            await await getClient().mutateConferenceLeave({ id: conference.id, peerId });
        })();
        return () => {
            if (peerId !== '') {
                getClient().mutateConferenceLeave({ id: conference.id, peerId });
            }
            mounted = false;
        }
    }, []);

    // let ownPeerId = getClient().mutateConferenceJoin({ id: conference.id });

    if (!ownPeerId) {
        return null;
    }

    let connections = conference.peers.filter((v) => v.connection);

    return <>{
        connections.map((v) => (
            <CallMediaStreamComponent
                key={v.id}
                id={conference.id}
                peerId={v.id}
                ownPeerId={ownPeerId!!}
                stream={stream}
                connection={v.connection!}
                conference={conference}
            />
        ))
    }</>
});