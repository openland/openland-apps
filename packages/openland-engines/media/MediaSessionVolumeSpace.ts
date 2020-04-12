import { MediaSessionManager } from './MediaSessionManager';
import { VMMap, VMMapMap } from 'openland-y-utils/mvvm/vm';
import uuid from 'uuid';

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
    id: string;
    shift?: number[];
    rawPath?: number[][];
    path?: string;
    constructor(path?: string) {
        this.id = `path_${uuid()}`;
        this.path = path;
    }
}
type MessageType = PeerAvatar | Path;

export class MediaSessionVolumeSpace {
    private mediaSession: MediaSessionManager;
    private unsubscribe: () => void;
    readonly selfPeer: PeerAvatar;
    readonly selfPathsVM = new VMMap<string, Path>();
    readonly peersVM = new VMMap<string, PeerAvatar>();
    readonly pathsVM = new VMMapMap<string, string, Path>();
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

    ////
    // handle changes
    ////
    moveSelf = (to: number[]) => {
        this.selfPeer.coords = to;
        this.reportPeer();
        [...this.peersVM.values()].map(this.updatePeerVolume);
    }

    updatePath = (path: Path) => {
        if (this.mediaSession.getPeerId()) {
            this.selfPathsVM.set(path.id, path);
            this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
            this.reportPath(path);
        }
    }

    updatePeerVolume = (peer: PeerAvatar) => {
        let distance = Math.pow(Math.pow(peer.coords[0] - this.selfPeer.coords[0], 2) + Math.pow(peer.coords[1] - this.selfPeer.coords[1], 2), 0.5);
        let volume = distance < this.minDinstance ? 1 : distance > this.maxDisatance ? 0 : 1 - (distance - this.minDinstance) / (this.maxDisatance - this.minDinstance);
        peer.coords[2] = volume;
        [...this.mediaSession.streamsVM.values()].find(s => s.getTargetPeerId() === peer.peerId)?.setVolume(volume);
        this.peersVM.set(peer.peerId, peer, true);
    }

    ////
    // send updates
    ////
    sendBatch = (batch: MessageType[], fullSync?: boolean) => {
        this.mediaSession.sendDcMessage(JSON.stringify({ channel: 'vm', seq: ++this.messageSeq, batch, fullSync }));
    }

    reportAll = () => {
        let b: MessageType[] = [];
        b.push(this.selfPeer);
        b.push(...[...this.selfPathsVM.values()].map(p => ({ ...p, rawPath: undefined })));
        this.sendBatch(b, true);
    }

    reportPeer = () => {
        let b: MessageType[] = [];
        b.push(this.selfPeer);
        this.sendBatch(b);
    }

    reportPath = (path: Path) => {
        let b: MessageType[] = [];
        path = { ...path, rawPath: undefined };
        b.push(path);
        this.sendBatch(b);
    }

    ////
    // recive updates
    ////
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
            let batch = message.batch as MessageType[];
            let pathsFull: string[] = [];
            for (let m of batch) {
                if (m.type === 'peer') {
                    m.peerId = container.peerId;
                    this.peersVM.set(m.peerId, m);
                    this.updatePeerVolume(m);
                }

                if (m.type === 'path') {
                    this.pathsVM.add(container.peerId, m.id, m);
                    pathsFull.push(m.id);
                }
            }
            // delete erased paths
            if (message.fullSync) {
                for (let localPath of this.pathsVM.get(container.peerId)?.values() || []) {
                    if (!pathsFull.find(remotePath => remotePath === localPath.id)) {
                        this.pathsVM.deleteVal(container.peerId, localPath.id);
                    }
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