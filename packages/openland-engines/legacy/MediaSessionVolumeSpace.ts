import { MediaSessionManager } from '../media/MediaSessionManager';
import { VMMap, VMMapMap, VM } from 'openland-y-utils/mvvm/vm';
import uuid from 'uuid';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { getPlaceholderColorRawById } from 'openland-web/components/unicorn/UAvatar';
//
// Objects
//
class PeerAvatar {
    type: 'peer' = 'peer';
    seq = 0;
    id: string;
    local = true;
    coords: number[];
    constructor(peerId: string, coords: number[]) {
        this.id = `peer_${peerId}`;
        this.coords = coords;
    }
}

class Pointer {
    type: 'pointer' = 'pointer';
    id: string;
    seq = 0;
    local = true;
    coords: number[];
    color?: string;
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

export class SimpleText {
    type: 'simple_text' = 'simple_text';
    id: string;
    seq = 0;
    local = true;
    text = '';
    color: string;
    fontSize: number;
    coords: number[];
    containerWH: number[];
    constructor(coords: number[], containerWH: number[], color: string, fontSize: number) {
        this.id = `simple_text_${uuid()}`;
        this.coords = coords;
        this.containerWH = containerWH;
        this.color = color;
        this.fontSize = fontSize;
    }
}

export type SpaceObject = Path | Image | PeerAvatar | Pointer | SimpleText;

//
// Updates
//

export class Add {
    type: 'add' = 'add';
    objects: SpaceObject[];
    constructor(objects: SpaceObject[]) {
        this.objects = objects;
    }
}

export class PartialUpdate {
    type: 'update' = 'update';
    id: string;
    change: Partial<SpaceObject> & Pick<SpaceObject, 'type' | 'seq'>;
    constructor(id: string, change: Partial<SpaceObject> & Pick<SpaceObject, 'type' | 'seq'>) {
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
    content: Add;
    constructor(peerId: string, content: Add) {
        this.peerId = peerId;
        this.content = content;
    }
}

type UpdateType = Add | Sync | PartialUpdate | PathIncrement | Reqest | LostPeer;

export class MediaSessionVolumeSpace {
    // readonly mediaSession: MediaSessionManager;
    // private d1: () => void;
    // private d2: () => void;
    // readonly selfPeer: PeerAvatar;
    selfPointer: Pointer | undefined;
    readonly selfObjects = new Map<string, SpaceObject>();
    readonly remoteObjects = new Map<string, SpaceObject>();
    readonly selfDeletedIds = new Set<string>();
    readonly knownPeers = new Set<string>();

    readonly peersVM = new VMMapMap<string, string, PeerAvatar>();
    readonly pointerVM = new VMMapMap<string, string, Pointer>();
    readonly pathsVM = new VMMapMap<string, string, Path>();
    readonly imagesVM = new VMMapMap<string, string, Image>();
    readonly simpleTextsVM = new VMMapMap<string, string, SimpleText>();

    readonly storages = {
        peer: this.peersVM,
        pointer: this.pointerVM,
        path: this.pathsVM,
        image: this.imagesVM,
        simple_text: this.simpleTextsVM,
    };

    readonly eraseVM = new VM<number[]>(true);
    readonly colorVM = new VM<string>();

    private interval: any;
    private messageSeq = 1;
    minDinstance = 50;
    maxDisatance = 200;
    constructor(messenger: MessengerEngine, mediaSession: MediaSessionManager) {
        // this.selfPeer = new PeerAvatar(mediaSession.getPeerId(), [Math.random() * 100 + 1450, Math.random() * 100 + 1450]);
        // this.setColor(getPlaceholderColorRawById(mediaSession.messenger.user.id).end);
        // this.mediaSession = mediaSession;
        // this.interval = setInterval(this.sync, 1000);
        // // this.d1 = this.mediaSession.dcVM.listen(this.onDcMessage);
        // this.d2 = messenger.getConversation(mediaSession.conversationId).subscribe({
        //     onMessageSend: (file, localImage) => {
        //         if (localImage && file) {
        //             (async () => {
        //                 let layout = layoutMedia(localImage.width, localImage.height, 1000, 1000);
        //                 let image = new Image(undefined, this.selfPeer.coords, [localImage.width, localImage.height], [layout.width, layout.height]);
        //                 file.watch(s => {
        //                     if (!image.fileId && s.uuid) {
        //                         image.fileId = s.uuid;
        //                         this.addSpaceObject(image);
        //                     }
        //                 });
        //             })();
        //         }
        //     },
        //     onChatLostAccess: () => {/* */ },
        //     onConversationUpdated: () => {/* */ }
        // });

        // // local/remote objects index
        // Object.keys(this.storages).map(k => {
        //     let s = this.storages[k];
        //     if (s instanceof VMMapMap) {
        //         s.listenAllIds(this.onObjUpdate);
        //     } else if (s instanceof VMMap) {
        //         s.listenAllValues(this.onObjUpdate);
        //     }
        // });
    }

    onObjUpdate = (obj: SpaceObject) => {
        (obj.local ? this.selfObjects : this.remoteObjects).set(obj.id, obj);
    }

    ////
    // handle local actions
    ////

    //
    // user presense
    //

    // TODO: use generic updates with side effects
    moveSelf = (to: number[]) => {
        // let batch: UpdateType[] = [];
        // let add = new Add([]);
        // batch.push(add);

        // this.selfPeer.coords = to;
        // let peerId = this.mediaSession.getPeerId();
        // if (peerId) {
        //     this.selfPeer.id = `peer_${peerId}`;
        //     add.objects.push(this.selfPeer);
        // }
        // // tweak
        // this.movePointer(to, false);
        // if (this.selfPointer) {
        //     add.objects.push(this.selfPointer);
        // }

        // this.sendBatch(batch);
        // [...this.peersVM.values()].flatMap(v => [...v.values()]).map(this.updatePeerVolume);
    }

    movePointer = (coords: number[], report: boolean = true) => {
        // if (this.mediaSession.getPeerId()) {
        //     if (!this.selfPointer) {
        //         this.selfPointer = new Pointer(this.mediaSession.getPeerId(), coords);
        //     }
        //     this.selfPointer.coords = coords;
        //     this.pointerVM.add(this.mediaSession.getPeerId(), this.mediaSession.getPeerId(), this.selfPointer, true);
        //     if (report) {
        //         this.sendBatch([new Add([this.selfPointer])]);
        //     }

        // }
    }

    //
    // drawings
    //
    incrementPath = (path: Path, increment: number[][]) => {
        // if (this.mediaSession.getPeerId()) {
        //     path.path.push(...increment);
        //     path.seq++;
        //     this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
        //     this.sendBatch([new PathIncrement(path.id, increment, path.seq)]);
        // }
    }

    //
    // generic
    //
    addSpaceObject = (obj: SpaceObject) => {
        // let peerId = this.mediaSession.getPeerId();
        // if (peerId) {
        //     let s = this.storages[obj.type];
        //     s.add(peerId, obj.id, obj as any);
        //     this.sendBatch([new Add([obj])]);
        // }
    }

    // yep, no access mgmt for now
    update = (id: string, change: Partial<SpaceObject> & Pick<SpaceObject, 'type'>) => {
        let b: UpdateType[] = [];
        let target = this.applyUpdate(id, change);
        if (!target) {
            return;
        }
        b.push(new PartialUpdate(id, { ...change, seq: target.seq }));

        // tweaks
        // TODO: pass to handlers on refactor
        if (target.type === 'image' || target.type === 'simple_text') {
            this.movePointer([target.coords[0] + target.containerWH[0] / 2, target.coords[1] + target.containerWH[1] / 2], false);
            if (this.selfPointer) {
                b.push(new Add([this.selfPointer]));
            }
        }

        this.sendBatch(b);
    }

    applyUpdate = (id: string, change: Partial<SpaceObject> & Pick<SpaceObject, 'type'>, increment: boolean = true) => {
        let store = this.storages[change.type];
        let target = store.getById(id);
        if (!target) {
            return;
        }
        target = { ...target, ...change } as SpaceObject;
        if (increment) {
            target.seq++;
        }
        // TODO: figure out how to resolve typings here
        store.addById(id, target as any, true);
        return target;
    }

    // yep, no access mgmt for now
    delete = (id: string) => {
        Object.keys(this.storages).map(k => {
            this.storages[k].deleteByValId(id);
        });
        this.selfObjects.delete(id);
        this.remoteObjects.delete(id);

        this.selfDeletedIds.add(id);
        this.sync();
    }

    erase = (coords: number[]) => {
        this.eraseVM.set(coords);
    }

    setColor = (color: string) => {
        this.colorVM.set(color);
        if (this.selfPointer) {
            this.selfPointer.color = color;
        }
    }

    ////
    // side effects
    ////
    updatePeerVolume = (peer: PeerAvatar) => {
        // let distance = Math.pow(Math.pow(peer.coords[0] - this.selfPeer.coords[0], 2) + Math.pow(peer.coords[1] - this.selfPeer.coords[1], 2), 0.5);
        // let volume = distance < this.minDinstance ? 1 : distance > this.maxDisatance ? 0 : 1 - (distance - this.minDinstance) / (this.maxDisatance - this.minDinstance);
        // peer.coords[2] = volume;
        // // [...this.mediaSession.streamsVM.values()].find(s => s.getTargetPeerId() === peer.id)?.setVolume(volume);
        // this.peersVM.add(peer.id, peer.id, peer, true);
    }

    ////
    // send updates
    ////
    sendBatch = (batch: UpdateType[]) => {
        // this.mediaSession.sendDcMessage({ channel: 'vm', seq: ++this.messageSeq, batch });
    }

    sync = () => {
        let add = new Add([]);
        let batch: UpdateType[] = [add];
        if (this.selfPointer) {
            add.objects.push(this.selfPointer);
        }
        // let selfPeerId = this.mediaSession.getPeerId();
        // if (selfPeerId) {
        //     this.selfPeer.id = `peer_${selfPeerId}`;
        //     add.objects.push(this.selfPeer);
        //     this.knownPeers.add(selfPeerId);
        // }
        batch.push(new Sync(
            [...this.selfObjects.entries()].map(e => ({ id: e[0], seq: e[1].seq })),
            [...this.selfDeletedIds.values()],
            [...this.knownPeers.values()]
        ));
        this.sendBatch(batch);
    }

    ////
    // recive updates
    ////
    private peerSeq: { [peerId: string]: number } = {};
    onDcMessage = (container: { peerId: string, data: any, dataParsed?: any }) => {
        let update;
        try {
            update = container.dataParsed || JSON.parse(container.data);
        } catch (e) {
            console.warn('[VM]', "can't parse message", container.data);
        }

        if (update?.channel !== 'vm') {
            return;
        }
        if (update.seq <= (this.peerSeq[container.peerId] || 0)) {
            console.warn('[VM]', 'seq too old', container.data);
            return;
        }
        this.peerSeq[container.peerId] = update.seq;
        let batch = update.batch as UpdateType[];
        this.knownPeers.add(container.peerId);
        for (let u of batch) {

            if (u.type === 'sync') {
                // delete
                u.deletedIDs.map(id => {
                    Object.keys(this.storages).map(k => {
                        this.storages[k].deleteByValId(id);
                    });

                    this.selfObjects.delete(id);
                    this.remoteObjects.delete(id);
                });
                // requst unknown items
                let ids: string[] = [];
                let peers: string[] = [];
                for (let remote of u.objects) {
                    let ex = this.remoteObjects.get(remote.id);
                    if (!ex || ex.seq < remote.seq) {
                        ids.push(remote.id);
                    }
                }
                // requst left peer content
                for (let peerId of u.knownPeers) {
                    // if (!this.knownPeers.has(peerId) && peerId !== this.mediaSession.getPeerId()) {
                    //     peers.push(peerId);
                    // }
                }
                if (ids.length + peers.length > 0) {
                    this.sendBatch([new Reqest(ids, peers)]);
                }
            } else if (u.type === 'request') {
                let add = new Add([]);
                let b: UpdateType[] = [add];
                // add requested objects
                for (let id of u.ids) {
                    let local = this.selfObjects.get(id);
                    if (local && local.local) {
                        add.objects.push({ ...local, local: false });
                    }
                }

                // add left peer content
                for (let peerId of u.peers) {
                    let lostContent = new Add([]);
                    Object.keys(this.storages).map(k => {
                        let s = this.storages[k];
                        // filter out pointer/peer - this peers are left, send only  content
                        if (k !== 'pointer' && k !== 'peer') {
                            let objects = s.get(peerId);
                            if (objects) {
                                lostContent.objects.push(...objects.values());
                            }
                        }
                    });
                    b.push(new LostPeer(peerId, lostContent));
                }
                this.sendBatch(b);
            } else if (u.type === 'lost_peer') {
                // recieve left peer content
                this.knownPeers.add(u.peerId);
                this.handleAdd(u.peerId, u.content);
            }

            //
            // content added
            //
            if (u.type === 'add') {
                this.handleAdd(container.peerId, u);
            }

            //
            // content updated
            //
            if (u.type === 'update') {
                this.applyUpdate(u.id, u.change, false);
            } else if (u.type === 'path_inc') {
                // TODO: move to handler on refactor
                let path = this.pathsVM.getById(u.id);
                if (path) {
                    path.path.push(...u.increment);
                    this.pathsVM.add(container.peerId, u.id, path, true);
                }
            }
        }
    }

    handleAdd = (peerId: string, add: Add) => {
        for (let obj of add.objects) {
            let s = this.storages[obj.type];
            if (s) {
                s.add(peerId, obj.id, { ...obj as any, local: false }, true);
            }
            // side effect
            // TODO: move to handler on refactor
            if (obj.type === 'peer') {
                this.updatePeerVolume(obj);
            }
        }
    }

    dispose = () => {
        // this.d1();
        // this.d2();
        clearInterval(this.interval);
    }
}