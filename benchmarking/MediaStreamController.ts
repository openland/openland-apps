import { ConferenceMediaWatch_media_streams } from '../packages/openland-api/spacex.types';
import { RTCPeerConnection } from 'wrtc';
import { OpenlandClient } from '../packages/openland-api/spacex';

export interface AppSessionDescription {
    type: 'offer' | 'answer';
    sdp: string;
}

function resolveIceTransportPolicy(state: ConferenceMediaWatch_media_streams) {
    let iceTransportPolicy: 'relay' | 'all' | undefined = undefined;
    if (state.iceTransportPolicy === 'ALL') {
        iceTransportPolicy = 'all';
    }
    if (state.iceTransportPolicy === 'RELAY') {
        iceTransportPolicy = 'relay';
    }

    return iceTransportPolicy;
}

export class MediaStreamController {
    client: OpenlandClient;
    peerId: string;
    id: string;
    seq: number;
    currentState: ConferenceMediaWatch_media_streams | undefined;
    connection: RTCPeerConnection;
    localAnswerSent = false;
    localAnswer: AppSessionDescription | null = null;
    remoteOffer: AppSessionDescription | null = null;

    constructor(client: OpenlandClient, peerId: string, initialState: ConferenceMediaWatch_media_streams) {
        this.client = client;
        this.peerId = peerId;
        this.id = initialState.id;
        this.seq = initialState.seq;

        this.currentState = initialState;
        this.connection = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: resolveIceTransportPolicy(initialState)
        });

        this.update(initialState);
    }

    async update(state: ConferenceMediaWatch_media_streams) {
        this.currentState = state;

        if (this.currentState.seq < this.seq) {
            return;
        }
        if (this.id !== state.id) {
            return;
        }

        if (state.state === 'WAIT_OFFER') {
            // noop
        } else if (state.state === 'NEED_ANSWER') {
            if (state.seq > this.seq) {
                this.localAnswerSent = false;
                this.localAnswer = null;
                this.remoteOffer = null;
            }

            if (!this.remoteOffer) {
                let offer = JSON.parse(state.sdp!);
                // console.log('[WEBRTC]: ' + this.id + ': Got offer');
                // console.log(offer.sdp);
                await this.connection.setRemoteDescription(offer);
                this.remoteOffer = offer;
            }

            if (!this.localAnswer) {
                // console.log('[WEBRTC]: ' + this.id + ': Creating answer');
                let answer = await this.connection.createAnswer();
                // console.log('[WEBRTC]: ' + this.id + ': Answer');
                // console.log(answer.sdp);
                await this.connection.setLocalDescription(answer);
                this.localAnswer = answer;
            }

            if (!this.localAnswerSent) {
                await this.client.mutateMediaAnswer({
                    id: this.id,
                    peerId: this.peerId,
                    answer: JSON.stringify(this.localAnswer),
                    seq: state.seq
                });
                this.localAnswerSent = true;
            }

        } else if (state.state === 'READY') {
            // noop
        }
    }

    destroy() {
        // noop
    }
}