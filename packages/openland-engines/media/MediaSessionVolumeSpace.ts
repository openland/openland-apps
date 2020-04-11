import { MediaSessionManager } from './MediaSessionManager';

export class MediaSessionVolumeSpace {
    private mediaSession: MediaSessionManager;
    private unsubscribe: () => void;
    private setlfCoords = [Math.random() * 100 + 1450, Math.random() * 100 + 1450];
    private interval: any;
    private messageSeq = 0;
    private listeners = new Set<(data: { [peerId: string]: number[] }) => void>();
    minDinstance = 50;
    maxDisatance = 200;
    constructor(mediaSession: MediaSessionManager) {
        this.mediaSession = mediaSession;
        this.interval = setInterval(this.reportPosition, 1000);
        this.unsubscribe = this.mediaSession.dcVM.listen(this.onDcMessage);
    }

    reportPosition = () => {
        this.mediaSession.sendDcMessage(JSON.stringify({ channel: 'vm', seq: this.messageSeq, position: this.setlfCoords }));
    }

    onSelfMoved = (to: number[]) => {
        this.setlfCoords = to;
        this.reportPosition();
        for (let p of Object.keys(this.peerCoords)) {
            this.updatePeerVolume(p);
        }
        this.notify();
    }

    getSelfCoords = () => {
        return this.setlfCoords;
    }

    updatePeerVolume = (peerId: string) => {
        let coords = this.peerCoords[peerId];
        if (!coords) {
            return;
        }
        let distance = Math.pow(Math.pow(coords[0] - this.setlfCoords[0], 2) + Math.pow(coords[1] - this.setlfCoords[1], 2), 0.5);
        let volume = distance < this.minDinstance ? 1 : distance > this.maxDisatance ? 0 : 1 - (distance - this.minDinstance) / (this.maxDisatance - this.minDinstance);
        coords[2] = volume;
        [...this.mediaSession.streamsVM.values()].find(s => s.getTargetPeerId() === peerId)?.setVolume(volume);
    }

    private peerSeq: { [peerId: string]: number } = {};
    private peerCoords: { [peerId: string]: number[] } = {};
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
            if (message.seq <= (this.peerSeq[container.peerId] || -1)) {
                return;
            }
            this.peerSeq[container.peerId] = message.seq;
            // this.peerCoords[container.peerId] = ;
            this.peerCoords[container.peerId] = message.position;
            this.updatePeerVolume(container.peerId);
            this.notify();
        } catch (e) {
            console.error('[wtf]', container.data);
            throw (e);
        }
    }

    notify = () => {
        for (let l of this.listeners) {
            l(this.peerCoords);
        }
    }

    ////
    // IO
    ////
    listenPeers = (listener: (data: { [peerId: string]: number[] }) => void) => {
        this.listeners.add(listener);
        listener(this.peerCoords);
        return () => {
            this.listeners.delete(listener);
        };
    }

    /////
    /////
    dispose = () => {
        this.unsubscribe();
        clearInterval(this.interval);
    }
}