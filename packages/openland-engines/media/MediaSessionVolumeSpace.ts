import { MediaSessionManager } from './MediaSessionManager';
import { VMMap, VMMapMap, VM } from 'openland-y-utils/mvvm/vm';
import uuid from 'uuid';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { GlobalEventBus } from 'openland-api/spacex.types';

class PeerAvatar {
    type: 'peer' = 'peer';
    seq = 0;
    id: string;
    local = true;
    coords: number[];
    constructor(peerId: string, coords: number[]) {
        this.id = peerId;
        this.coords = coords;
    }
}

class Pointer {
    type: 'pointer' = 'pointer';
    id: string;
    seq = 0;
    local = true;
    coords: number[];
    constructor(peerId: string, coords: number[]) {
        this.id = `pointer_${peerId}`;
        this.coords = coords;
    }
}

export class Path {
    type: 'path' = 'path';
    id: string;
    local = true;
    seq = 0;
    path: number[][];
    color: string;
    constructor(path: number[][], color: string) {
        this.id = `path_${uuid()}`;
        console.warn('path created', this.id);
        this.path = path;
        this.color = color;
    }
}

export class PathIncrement {
    type: 'path_inc' = 'path_inc';
    seq: number;
    id: string;
    increment: number[][];
    constructor(pathId: string, increment: number[][], seq: number) {
        this.id = pathId;
        this.increment = increment;
        this.seq = seq;
    }
}

export class Image {
    type: 'image' = 'image';
    id: string;
    local = true;
    seq = 0;
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

// export class SimpleText {
//     type: 'simple_text' = 'simple_text';
//     id: string;
//     local = true;
//     constructor(){
//         id = ``
//     }
// }

type Updateable = Image;

export class Update {
    type: 'update' = 'update';
    id: string;
    change: Partial<Updateable> & Pick<Updateable, 'type' | 'seq'>;
    constructor(id: string, change: Partial<Updateable> & Pick<Updateable, 'type' | 'seq'>) {
        this.id = id;
        this.change = change;
    }
}

class Sync {
    type: 'sync' = 'sync';
    objects: { id: string, seq: number }[];
    deletedIDs: string[];
    knownPeers: string[];
    constructor(objects: { id: string, seq: number }[], deletedIDs: string[], knownPeers: string[]) {
        this.objects = objects;
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

type SpaceObject = Path | Image | PeerAvatar | Pointer;
type MessageType = SpaceObject | Sync | Update | PathIncrement | Reqest | LostPeer;

export class MediaSessionVolumeSpace {
    private messenger: MessengerEngine;
    private mediaSession: MediaSessionManager;
    private d1: () => void;
    private d2: () => void;
    readonly selfPeer: PeerAvatar;
    selfPointer: Pointer | undefined;
    readonly selfObjects = new Map<string, SpaceObject>();
    readonly remoteObjects = new Map<string, SpaceObject>();
    readonly selfDeletedIds = new Set<string>();
    readonly knownPeers = new Set<string>();

    readonly peersVM = new VMMap<string, PeerAvatar>();
    readonly pointerVM = new VMMap<string, Pointer>();
    readonly pathsVM = new VMMapMap<string, string, Path>();
    readonly imagesVM = new VMMapMap<string, string, Image>();

    readonly storages = {
        peer: this.peersVM,
        pointer: this.pointerVM,
        path: this.pathsVM,
        image: this.imagesVM
    };

    readonly eraseVM = new VM<number[]>(true);

    private interval: any;
    private messageSeq = 1;
    minDinstance = 50;
    maxDisatance = 200;
    constructor(messenger: MessengerEngine, mediaSession: MediaSessionManager) {
        this.messenger = messenger;
        this.selfPeer = new PeerAvatar(mediaSession.getPeerId(), [Math.random() * 100 + 1450, Math.random() * 100 + 1450]);
        this.mediaSession = mediaSession;
        this.interval = setInterval(this.sync, 1000);
        // this.d1 = this.mediaSession.dcVM.listen(this.onDcMessage);
        this.d1 = reliableWatcher<GlobalEventBus>((handler) => messenger.client.subscribeGlobalEventBus({ topic: `space_${this.mediaSession.conversationId}` }, handler), m => {
            try {
                let message = JSON.parse(m.globalEventBus.message);
                if (message.peerId && message.data) {
                    this.onDcMessage({ peerId: message.peerId, data: '', dataParsed: message.data });
                }
            } catch (e) {
                console.error(e);
            }
        });
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

        // local/remote objects index
        Object.keys(this.storages).map(k => {
            let s = this.storages[k];
            if (s instanceof VMMapMap) {
                s.listenAllIds(this.onObjUpdate);
            } else if (s instanceof VMMap) {
                s.listenAllValues(this.onObjUpdate);
            }
        });
    }

    onObjUpdate = (obj: SpaceObject) => {
        (obj.local ? this.selfObjects : this.remoteObjects).set(obj.id, obj);
    }

    ////
    // handle local commands
    ////
    moveSelf = (to: number[]) => {
        let b: MessageType[] = [];
        this.selfPeer.coords = to;
        b.push(this.selfPeer);
        this.movePointer(to, false);
        if (this.selfPointer) {
            b.push(this.selfPointer);
        }
        this.sendBatch(b);
        [...this.peersVM.values()].map(this.updatePeerVolume);
    }

    addPath = (path: Path) => {
        if (this.mediaSession.getPeerId()) {
            this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
            this.reportSingle(path);
        }
    }

    movePointer = (coords: number[], report: boolean = true) => {
        if (this.mediaSession.getPeerId()) {
            if (!this.selfPointer) {
                this.selfPointer = new Pointer(this.mediaSession.getPeerId(), coords);
            }
            this.selfPointer.coords = coords;
            this.pointerVM.set(this.mediaSession.getPeerId(), this.selfPointer, true);
            if (report) {
                this.reportSingle(this.selfPointer);
            }

        }
    }

    incrementPath = (path: Path, increment: number[][]) => {
        if (this.mediaSession.getPeerId()) {
            path.path.push(...increment);
            path.seq++;
            this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
            this.reportSingle(new PathIncrement(path.id, increment, path.seq));
        }
    }

    addImage = (image: Image) => {
        if (this.mediaSession.getPeerId()) {
            this.imagesVM.add(this.mediaSession.getPeerId(), image.id, image, true);
            this.reportSingle(image);
        }
    }

    // yep, no access mgmt for now
    update = (id: string, change: Partial<Updateable> & Pick<Updateable, 'type'>) => {
        let store = this.storages[change.type];
        let target = store?.getById(id);
        if (!target) {
            return;
        }

        let b: MessageType[] = [];

        target = { ...target, ...change };
        target.seq++;
        this.imagesVM.addById(id, target, true);

        b.push(new Update(id, { ...change, type: target.type, seq: target.seq }));

        // tweaks
        if (target.type === 'image') {
            this.movePointer([target.coords[0] + target.containerWH[0] / 2, target.coords[1] + target.containerWH[1] / 2], false);
            if (this.selfPointer) {
                b.push(this.selfPointer);
            }
        }

        this.sendBatch(b);
    }

    // yep, no access mgmt for now
    delete = (id: string) => {
        Object.keys(this.storages).map(k => {
            let s = this.storages[k];
            if (s instanceof VMMapMap) {
                s.deleteByValId(id);
            } else if (s instanceof VMMap) {
                s.delete(id);
            }
        });
        this.selfObjects.delete(id);
        this.remoteObjects.delete(id);

        this.selfDeletedIds.add(id);
        console.warn('delete >>', id);
        this.sync();
    }

    erase = (coords: number[]) => {
        this.eraseVM.set(coords);
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
        batch = batch.map(m => ({ ...m, local: false }));
        // this.mediaSession.sendDcMessage(JSON.stringify({ channel: 'vm', seq: ++this.messageSeq, batch }));
        if (this.mediaSession.getPeerId()) {
            this.messenger.client.mutateGlobalEventBusPublish({ topic: `space_${this.mediaSession.conversationId}`, message: JSON.stringify({ peerId: this.mediaSession.getPeerId(), data: { channel: 'vm', seq: ++this.messageSeq, batch } }) });
        }
    }

    sync = () => {
        let b: MessageType[] = [];
        b.push(this.selfPeer);
        if (this.selfPointer) {
            b.push(this.selfPointer);
        }
        let selfPeerId = this.mediaSession.getPeerId();
        if (selfPeerId) {
            this.knownPeers.add(selfPeerId);
        }
        b.push(new Sync(
            [...this.selfObjects.entries()].map(e => ({ id: e[0], seq: e[1].seq })),
            [...this.selfDeletedIds.values()],
            [...this.knownPeers.values()]
        ));
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
    onDcMessage = (container: { peerId: string, data: any, dataParsed?: any }) => {
        if (container.peerId === this.mediaSession.getPeerId()) {
            return;
        }
        if (typeof container.data !== 'string') {
            return;
        }
        let message = container.dataParsed || JSON.parse(container.data);

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

            if (m.type === 'sync') {
                // delete
                m.deletedIDs.map(id => {
                    Object.keys(this.storages).map(k => {
                        let s = this.storages[k];
                        if (s instanceof VMMapMap) {
                            s.deleteByValId(id);
                        } else if (s instanceof VMMap) {
                            s.delete(id);
                        }
                    });

                    this.selfObjects.delete(id);
                    this.remoteObjects.delete(id);
                });
                // requst unknown items
                let ids: string[] = [];
                let peers: string[] = [];
                for (let remote of m.objects) {
                    let ex = this.remoteObjects.get(remote.id);
                    if (!ex || ex.seq < remote.seq) {
                        ids.push(remote.id);
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
                // add requested objects
                for (let id of m.ids) {
                    let local = this.selfObjects.get(id);
                    if (local && local.local) {
                        msgs.push({ ...local, local: false });
                    }
                }

                // add left peer content
                for (let peerId of m.peers) {
                    let lost: MessageType[] = [];
                    Object.keys(this.storages).map(k => {
                        let s = this.storages[k];
                        // filter out pointer/peer - this peers are left, send only  content
                        if (k !== 'pointer' && k !== 'peer') {
                            if (s instanceof VMMapMap) {
                                let objects = s.get(peerId);
                                if (objects) {
                                    lost.push(...objects.values());
                                }
                            }
                        }
                    });
                    msgs.push(new LostPeer(peerId, lost));
                }
                this.sendBatch(msgs);
            } else if (m.type === 'lost_peer') {
                // recieve left peer content
                this.knownPeers.add(m.peerId);
                for (let lost of m.messages) {
                    if (lost.type === 'image') {
                        this.imagesVM.add(m.peerId, lost.id, lost);
                    } else if (lost.type === 'path') {
                        this.pathsVM.add(m.peerId, lost.id, lost);
                    }
                }
            }

            // 
            // content added
            //
            if (m.type === 'peer') {
                m.id = container.peerId;
                this.peersVM.set(m.id, m);
                this.updatePeerVolume(m);
            } else if (m.type === 'pointer') {
                this.pointerVM.set(container.peerId, m);
            } else if (m.type === 'path') {
                this.pathsVM.add(container.peerId, m.id, m);
            } else if (m.type === 'image') {
                this.imagesVM.add(container.peerId, m.id, m);
            }

            //
            // content updated
            //
            if (m.type === 'update') {
                let store = this.storages[m.change.type];
                let target = store?.getById(m.id);
                if (target && target.seq < m.change.seq) {
                    let updated = { ...target, ...m.change };
                    store?.addById(m.id, updated, true);
                }
            } else if (m.type === 'path_inc') {
                let path = this.pathsVM.getById(m.id);
                if (path) {
                    path.path.push(...m.increment);
                    this.pathsVM.add(container.peerId, m.id, path, true);
                }
            }
        }
    }

    dispose = () => {
        this.d1();
        this.d2();
        clearInterval(this.interval);
    }
}