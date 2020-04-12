import { MediaSessionManager } from './MediaSessionManager';
import { VMMap } from 'openland-y-utils/mvvm/vm';
import uuid from 'uuid';
import { MediaType } from 'express';

class PeerAvatar {
    type: 'peer' = 'peer';
    peerId: string;
    coords: number[];
    constructor(peerId: string, coords: number[]) {
        this.peerId = peerId;
        this.coords = coords;
    }
}

export class Path {
    type: 'path' = 'path';
    peerId: string;
    id: string;
    shift?: number[];
    rawPath?: number[];
    path?: string;
    constructor(peerId: string, path?: string) {
        this.peerId = peerId;
        this.id = `path_${uuid()}`;
        this.path = path;
    }
}
type MessageType = PeerAvatar | Path;

export class MediaSessionVolumeSpace {
    private mediaSession: MediaSessionManager;
    private unsubscribe: () => void;
    private selfPeer: PeerAvatar;
    private selfPathsVM = new VMMap<string, Path>();
    readonly peersVM = new VMMap<string, PeerAvatar>();
    readonly pathsVM = new VMMap<string, Path>();
    private interval: any;
    private messageSeq = 1;
    minDinstance = 50;
    maxDisatance = 200;
    constructor(mediaSession: MediaSessionManager) {
        this.selfPeer = new PeerAvatar(mediaSession.getPeerId(), [Math.random() * 100 + 1450, Math.random() * 100 + 1450]);
        this.mediaSession = mediaSession;
        this.interval = setInterval(this.reportAll, 1000);
        this.unsubscribe = this.mediaSession.dcVM.listen(this.onDcMessage);
    }

    sendBatch = (batch: MessageType[]) => {
        this.mediaSession.sendDcMessage(JSON.stringify({ channel: 'vm', seq: ++this.messageSeq, batch }));
    }

    reportAll = () => {
        let b: MessageType[] = [];
        b.push(this.selfPeer);
        b.push(...this.selfPathsVM.values());
        this.sendBatch(b);
    }

    reportPosition = () => {
        let b: MessageType[] = [];
        b.push(this.selfPeer);
        this.sendBatch(b);
    }

    onSelfMoved = (to: number[]) => {
        this.selfPeer.coords = to;
        this.reportPosition();
        [...this.peersVM.values()].map(this.updatePeerVolume);
    }

    getSelfCoords = () => {
        return this.selfPeer.coords;
    }

    updatePeerVolume = (peer: PeerAvatar) => {
        let distance = Math.pow(Math.pow(peer.coords[0] - this.selfPeer.coords[0], 2) + Math.pow(peer.coords[1] - this.selfPeer.coords[1], 2), 0.5);
        let volume = distance < this.minDinstance ? 1 : distance > this.maxDisatance ? 0 : 1 - (distance - this.minDinstance) / (this.maxDisatance - this.minDinstance);
        peer.coords[2] = volume;
        [...this.mediaSession.streamsVM.values()].find(s => s.getTargetPeerId() === peer.peerId)?.setVolume(volume);
        this.peersVM.set(peer.peerId, peer, true);
    }

    private peerSeq: { [peerId: string]: number } = {};
    onDcMessage = (container: { peerId: string, data: any }) => {
        if (typeof container.data !== 'string') {
            return;
        }
        try {
            let message = JSON.parse(container.data);

            if (!message) {
                console.warn('[VM]', "can't parse message", container.data);
            }
            if (message.channel !== 'vm') {
                return;
            }
            if (message.seq <= (this.peerSeq[container.peerId] || 0)) {
                console.warn('[VM]', 'seq too old', container.data);
                return;
            }
            this.peerSeq[container.peerId] = message.seq;
            // this.peerCoords[container.peerId] = ;
            let batch = message.batch as MessageType[];
            for (let m of batch) {
                if (m.type === 'peer') {
                    m.peerId = container.peerId;
                    this.peersVM.set(m.peerId, m);
                    this.updatePeerVolume(m);
                }
            }

        } catch (e) {
            console.error('[wtf]', container.data);
            throw (e);
        }
    }

    dispose = () => {
        this.unsubscribe();
        clearInterval(this.interval);
    }
}