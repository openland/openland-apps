import { MediaSessionManager } from './MediaSessionManager';
import { VMMap, VMMapMap } from 'openland-y-utils/mvvm/vm';
import uuid from 'uuid';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { layoutMedia } from 'openland-y-utils/MediaLayout';

class PeerAvatar {
    type: 'peer' = 'peer';
    id: string;
    coords: number[];
    constructor(peerId: string, coords: number[]) {
        this.id = peerId;
        this.coords = coords;
    }
}

export class Path {
    type: 'path' = 'path';
    id: string;
    path: number[][];
    constructor(path: number[][]) {
        this.id = `path_${uuid()}`;
        this.path = path;
    }
}

export class PathIncrement {
    type: 'path_inc' = 'path_inc';
    pathId: string;
    increment: number[][];
    constructor(pathId: string, increment: number[][]) {
        this.pathId = pathId;
        this.increment = increment;
    }
}

export class Image {
    type: 'image' = 'image';
    id: string;
    coords: number[];
    containerWH: number[];
    imageWH: number[];
    fileId?: string;
    constructor(fileId: string | undefined, coords: number[], imageWH: number[], containerWH: number[]) {
        this.id = `image_${uuid()}`;
        this.coords = coords;
        this.containerWH = containerWH;
        this.imageWH = imageWH;
        this.fileId = fileId;
    }
}

export class Move {
    type: 'move' = 'move';
    id: string;
    coords: number[];
    constructor(id: string, coords: number[]) {
        this.id = id;
        this.coords = coords;
    }
}

class Sync {
    type: 'sync' = 'sync';
    ids: string[];
    deletedIDs: string[];
    knownPeers: string[];
    constructor(ids: string[], deletedIDs: string[], knownPeers: string[]) {
        this.ids = ids;
        this.deletedIDs = deletedIDs;
        this.knownPeers = knownPeers;
    }
}

class Reqest {
    type: 'request' = 'request';
    ids: string[];
    peers: string[];
    constructor(ids: string[], peers: string[]) {
        this.ids = ids;
        this.peers = peers;
    }
}

class LostPeer {
    type: 'lost_peer' = 'lost_peer';
    peerId: string;
    messages: MessageType[];
    constructor(peerId: string, messages: MessageType[]) {
        this.peerId = peerId;
        this.messages = messages;
    }
}

type MessageType = PeerAvatar | Path | Image | Sync | Move | PathIncrement | Reqest | LostPeer;

export class MediaSessionVolumeSpace {
    private mediaSession: MediaSessionManager;
    private d1: () => void;
    private d2: () => void;
    readonly selfPeer: PeerAvatar;
    readonly selfPathsVM = new VMMap<string, Path>();
    readonly selfImagesVM = new VMMap<string, Image>();
    readonly peersVM = new VMMap<string, PeerAvatar>();
    readonly pathsVM = new VMMapMap<string, string, Path>();
    readonly imagesVM = new VMMapMap<string, string, Image>();
    readonly selfDeletedIds = new Set<string>();
    readonly knownPeers = new Set<string>();
    private interval: any;
    private messageSeq = 1;
    minDinstance = 50;
    maxDisatance = 200;
    constructor(messenger: MessengerEngine, mediaSession: MediaSessionManager) {
        this.selfPeer = new PeerAvatar(mediaSession.getPeerId(), [Math.random() * 100 + 1450, Math.random() * 100 + 1450]);
        this.mediaSession = mediaSession;
        this.interval = setInterval(this.sync, 1000);
        this.d1 = this.mediaSession.dcVM.listen(this.onDcMessage);

        this.d2 = messenger.getConversation(mediaSession.conversationId).subscribe({
            onMessageSend: (file, localImage) => {
                if (localImage && file) {
                    (async () => {
                        let layout = layoutMedia(localImage.width, localImage.height, 1000, 1000);
                        let image = new Image(undefined, this.selfPeer.coords, [localImage.width, localImage.height], [layout.width, layout.height]);
                        file.watch(s => {
                            if (!image.fileId && s.uuid) {
                                image.fileId = s.uuid;
                                this.addImage(image);
                            }
                        });
                    })();
                }
            },
            onChatLostAccess: () => {/* */ },
            onConversationUpdated: () => {/* */ }
        });
    }

    ////
    // handle local commands
    ////
    moveSelf = (to: number[]) => {
        this.selfPeer.coords = to;
        this.reportSingle(this.selfPeer);
        [...this.peersVM.values()].map(this.updatePeerVolume);
    }

    addPath = (path: Path) => {
        if (this.mediaSession.getPeerId()) {
            this.selfPathsVM.set(path.id, path);
            this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
            this.reportSingle(path);
        }
    }

    incrementPath = (path: Path, increment: number[][]) => {
        if (this.mediaSession.getPeerId()) {
            path.path.push(...increment);
            this.selfPathsVM.set(path.id, path, true);
            this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
            this.reportSingle(new PathIncrement(path.id, increment));
        }
    }

    addImage = (image: Image) => {
        if (this.mediaSession.getPeerId()) {
            this.selfImagesVM.set(image.id, image);
            this.imagesVM.add(this.mediaSession.getPeerId(), image.id, image, true);
            this.reportSingle(image);
        }
    }

    // yep, no access mgmt for now
    delete = (id: string) => {
        this.selfImagesVM.delete(id);
        this.selfPathsVM.delete(id);
        this.pathsVM.deleteByValId(id);
        this.imagesVM.deleteByValId(id);
        this.selfDeletedIds.add(id);
        // deletions will be reported on sync
    }

    ////
    // effects
    ////
    updatePeerVolume = (peer: PeerAvatar) => {
        let distance = Math.pow(Math.pow(peer.coords[0] - this.selfPeer.coords[0], 2) + Math.pow(peer.coords[1] - this.selfPeer.coords[1], 2), 0.5);
        let volume = distance < this.minDinstance ? 1 : distance > this.maxDisatance ? 0 : 1 - (distance - this.minDinstance) / (this.maxDisatance - this.minDinstance);
        peer.coords[2] = volume;
        [...this.mediaSession.streamsVM.values()].find(s => s.getTargetPeerId() === peer.id)?.setVolume(volume);
        this.peersVM.set(peer.id, peer, true);
    }

    ////
    // send updates
    ////
    sendBatch = (batch: MessageType[]) => {
        this.mediaSession.sendDcMessage(JSON.stringify({ channel: 'vm', seq: ++this.messageSeq, batch }));
    }

    sync = () => {
        let b: MessageType[] = [];
        b.push(this.selfPeer);
        let selfPeerId = this.mediaSession.getPeerId();
        if (selfPeerId) {
            this.knownPeers.add(selfPeerId);
        }
        b.push(new Sync([...this.selfPathsVM.keys(), ...this.imagesVM.keys()], [...this.selfDeletedIds.values()], [...this.knownPeers.values()]));
        this.sendBatch(b);
    }

    reportSingle = (message: MessageType) => {
        let b: MessageType[] = [];
        b.push(message);
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
            this.knownPeers.add(container.peerId);
            for (let m of batch) {
                // state
                if (m.type === 'sync') {
                    // delete
                    for (let d of m.deletedIDs) {
                        this.imagesVM.deleteByValId(d);
                        this.pathsVM.deleteByValId(d);
                    }
                    // requst unknown items
                    let ids: string[] = [];
                    let peers: string[] = [];
                    for (let id of m.ids) {
                        if (!this.pathsVM.hasId(id)) {
                            ids.push(id);
                        }
                    }
                    // requst left peer content
                    for (let peerId of m.knownPeers) {
                        if (!this.knownPeers.has(peerId) && peerId !== this.mediaSession.getPeerId()) {
                            peers.push(peerId);
                        }
                    }
                    if (ids.length + peers.length > 0) {
                        this.reportSingle(new Reqest(ids, peers));
                    }
                } else if (m.type === 'request') {
                    let msgs: MessageType[] = [];
                    for (let id of m.ids) {
                        let image = this.selfImagesVM.get(id);
                        if (image) {
                            msgs.push(image);
                        }
                        let path = this.selfPathsVM.get(id);
                        if (path) {
                            msgs.push(path);
                        }
                    }

                    for (let peerId of m.peers) {
                        let lost: MessageType[] = [];
                        let imgs = this.imagesVM.get(peerId)?.values();
                        if (imgs) {
                            lost.push(...imgs);
                        }
                        let pths = this.pathsVM.get(peerId)?.values();
                        if (pths) {
                            lost.push(...pths);
                        }
                        msgs.push(new LostPeer(peerId, lost));
                    }
                    this.sendBatch(msgs);
                } else if (m.type === 'lost_peer') {
                    this.knownPeers.add(m.peerId);
                    for (let lost of m.messages) {
                        if (lost.type === 'image') {
                            this.imagesVM.add(m.peerId, lost.id, lost);
                        } else if (lost.type === 'path') {
                            this.pathsVM.add(m.peerId, lost.id, lost);
                        }
                    }
                }

                // state
                if (m.type === 'peer') {
                    m.id = container.peerId;
                    this.peersVM.set(m.id, m);
                    this.updatePeerVolume(m);
                } else if (m.type === 'path') {
                    this.pathsVM.add(container.peerId, m.id, m);
                } else if (m.type === 'path_inc') {
                    let path = this.pathsVM.getById(m.pathId);
                    if (path) {
                        path.path.push(...m.increment);
                        this.pathsVM.add(container.peerId, m.pathId, path, true);
                    }
                } else if (m.type === 'image') {
                    this.imagesVM.add(container.peerId, m.id, m);
                } else if (m.type === 'move') {
                    // only images for now
                    let image = this.imagesVM.getById(m.id);
                    if (image) {
                        image.coords = m.coords;
                        this.imagesVM.addById(m.id, image, true);
                    }
                }
            }
        } catch (e) {
            console.error('[wtf]', container.data);
            throw (e);
        }
    }

    dispose = () => {
        this.d1();
        this.d2();
        clearInterval(this.interval);
    }
}