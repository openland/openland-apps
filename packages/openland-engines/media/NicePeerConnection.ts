import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppPeerConnectionFactory } from 'openland-y-runtime/AppPeerConnection';
import { AppPeerConnectionConfiguration, AppPeerConnection } from 'openland-y-runtime-api/AppPeerConnectionApi';
import { AsyncLock } from '@openland/patterns';

export interface NiceStream {
    id: string;
    tracks: { id: string, type: string }[];
}

export class NicePeerConnection {
    readonly #peerConnection: AppPeerConnection;
    readonly #lock = new AsyncLock();
    #closed = false;

    constructor(opts: AppPeerConnectionConfiguration) {
        this.#peerConnection = AppPeerConnectionFactory.createConnection(opts);
    }

    async setActiveSendStreams(streams: NiceStream[]) {
        return await this.#inLock(async () => {
            //
        });
    }

    // async setActiveReceiveStreams(streams: NiceStream[]) {
    //     return await this.#inLock(async () => {
    //         //
    //     });
    // }

    async setTrack(trackId: string, track: AppMediaStreamTrack | null) {
        return await this.#inLock(async () => {
            //
        });
    }

    async createOffer() {
        return await this.#inLock(async () => {
            return await this.#peerConnection.createOffer();
        });
    }

    async createAnswer() {
        return await this.#inLock(async () => {
            return await this.#peerConnection.createAnswer();
        });
    }

    async setLocalDescription(sdp: string) {
        return await this.#inLock(async () => {
            return await this.#peerConnection.setLocalDescription(sdp);
        });
    }

    async setRemoteDescription(sdp: string) {
        return await this.#inLock(async () => {
            return await this.#peerConnection.setRemoteDescription(sdp);
        });
    }

    close() {
        if (!this.#closed) {
            this.#closed = true;
            this.#peerConnection.close();
        }
    }

    #inLock = async <T>(func: () => Promise<T> | T) => {
        return await this.#lock.inLock(async () => {
            if (this.#closed) {
                throw Error('PeerConnection closed');
            }
            let res = await func();
            if (this.#closed) {
                throw Error('PeerConnection closed');
            }
            return res;
        });
    }
}