import { ConferenceMediaWatch_media_streams } from '../packages/openland-api/spacex.types';
import { RTCPeerConnection } from 'wrtc';
import { OpenlandClient } from '../packages/openland-api/spacex';

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function backoff<T>(callback: () => Promise<T>): Promise<T> {
    while (true) {
        try {
            return await callback();
        } catch (e) {
            await delay(100);
        }
    }
}

export class MediaStreamController {
    client: OpenlandClient;
    peerId: string;
    id: string;
    seq: number;
    currentState: ConferenceMediaWatch_media_streams | undefined;
    connection: RTCPeerConnection;

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
            let offer = JSON.parse(state.sdp!);
            console.log('[WEBRTC]: ' + this.id + ': Got offer');
            console.log(offer.sdp);
            await this.connection.setRemoteDescription(offer);

            console.log('[WEBRTC]: ' + this.id + ': Creating answer');
            let answer = await this.connection.createAnswer();
            console.log('[WEBRTC]: ' + this.id + ': Answer');
            console.log(answer.sdp);
            await this.connection.setLocalDescription(answer);

            await backoff(() => this.client.mutateMediaAnswer({
                id: this.id,
                peerId: this.peerId,
                answer: JSON.stringify(answer),
                seq: state.seq
            }));
        } else if (state.state === 'READY') {
            // noop
        }
    }

    destroy() {
        // noop
    }
}