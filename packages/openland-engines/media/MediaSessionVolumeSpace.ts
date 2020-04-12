import { MediaSessionManager } from './MediaSessionManager';
import { VMMap, VMMapMap } from 'openland-y-utils/mvvm/vm';
import uuid from 'uuid';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

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

export class Image {
    type: 'image' = 'image';
    id: string;
    coords: number[];
    containerWH: number[];
    imageWH: number[];
    fileId?: string;
    constructor(fileId: string | undefined, coords: number[], imageWH: number[]) {
        this.id = `image_${uuid()}`;
        this.coords = coords;
        this.containerWH = imageWH;
        this.imageWH = imageWH;
        this.fileId = fileId;
    }
}

type MessageType = PeerAvatar | Path | Image;

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
    private interval: any;
    private messageSeq = 1;
    minDinstance = 50;
    maxDisatance = 200;
    constructor(messenger: MessengerEngine, mediaSession: MediaSessionManager) {
        this.selfPeer = new PeerAvatar(mediaSession.getPeerId(), [Math.random() * 100 + 1450, Math.random() * 100 + 1450]);
        this.mediaSession = mediaSession;
        this.interval = setInterval(this.reportAll, 1000);
        this.d1 = this.mediaSession.dcVM.listen(this.onDcMessage);

        this.d2 = messenger.getConversation(mediaSession.conversationId).subscribe({
            onMessageSend: (file, localImage) => {
                if (localImage && file) {
                    (async () => {
                        let image = new Image(undefined, this.selfPeer.coords, [localImage.width, localImage.height]);
                        file.watch(s => {
                            if (!image.fileId && s.uuid) {
                                image.fileId = s.uuid;
                                this.updateImage(image);
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
    // handle changes
    ////
    moveSelf = (to: number[]) => {
        this.selfPeer.coords = to;
        this.reportSingle(this.selfPeer);
        [...this.peersVM.values()].map(this.updatePeerVolume);
    }

    updatePath = (path: Path) => {
        if (this.mediaSession.getPeerId()) {
            this.selfPathsVM.set(path.id, path);
            this.pathsVM.add(this.mediaSession.getPeerId(), path.id, path, true);
            this.reportSingle({ ...path, rawPath: undefined });
        }
    }

    updateImage = (image: Image) => {
        if (this.mediaSession.getPeerId()) {
            this.selfImagesVM.set(image.id, image);
            this.imagesVM.add(this.mediaSession.getPeerId(), image.id, image, true);
            this.reportSingle(image);
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
        b.push(...this.selfImagesVM.values());
        b.push(...[...this.selfPathsVM.values()].map(p => ({ ...p, rawPath: undefined })));
        this.sendBatch(b, true);
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
            let pathsFull: string[] = [];
            let iamgesFull: string[] = [];
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
                if (m.type === 'image') {
                    this.imagesVM.add(container.peerId, m.id, m);
                    iamgesFull.push(m.id);
                }
            }
            if (message.fullSync) {
                // delete erased paths
                for (let localPath of this.pathsVM.get(container.peerId)?.values() || []) {
                    if (!pathsFull.find(remotePath => remotePath === localPath.id)) {
                        this.pathsVM.deleteVal(container.peerId, localPath.id);
                    }
                }

                // delete erased images
                for (let localImage of this.imagesVM.get(container.peerId)?.values() || []) {
                    if (!iamgesFull.find(remoteImage => remoteImage === localImage.id)) {
                        this.imagesVM.deleteVal(container.peerId, localImage.id);
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