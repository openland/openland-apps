import WebSocket from 'isomorphic-ws';

const empty = () => { /* */ };

export type ThrusterConfig = { url: string, timeout: number };

/**
 * This class provides a factory for rapid WebSocket connection establishing by using several 
 * parallel attempts with different settings. First success wins.
 */
export class Thruster {
    readonly configs: ThrusterConfig[];
    readonly onSuccess: (socket: WebSocket) => void;

    private bucketSockets: (WebSocket | null)[] = [];
    private bucketTimeout: any[] = [];
    private closed = false;

    constructor(configs: ThrusterConfig[], onSuccess: (socket: WebSocket) => void) {
        this.configs = configs;
        this.onSuccess = onSuccess;

        for (let i = 0; i < configs.length; i++) {
            this.bucketSockets.push(null);
            this.bucketTimeout.push(null);
        }

        for (let i = 0; i < configs.length; i++) {
            this.restartBucket(i);
        }
    }

    private restartBucket = (bucket: number) => {
        const timeout = this.configs[bucket].timeout;
        const url = this.configs[bucket].url;

        // Close existing
        if (this.bucketSockets[bucket]) {
            let ex = this.bucketSockets[bucket]!;
            this.bucketSockets[bucket] = null;
            ex.onclose = empty;
            ex.onopen = empty;
            ex.onmessage = empty;
            try {
                ex.close();
            } catch (e) {
                // Ignore
            }
        }

        // Clear timeout
        if (this.bucketTimeout[bucket]) {
            clearTimeout(this.bucketTimeout[bucket]);
            this.bucketTimeout[bucket] = null;
        }

        const ws = new WebSocket(url);
        this.bucketSockets[bucket] = ws;
        ws.onopen = () => {

            // Remove socket from buckets to avoid it's shutdown
            this.bucketSockets[bucket] = null;

            // Close all other sockets
            try {
                this.close();
            } catch (e) {
                // Ignore
            }

            // Remove callbacks and invoke onSuccess callback
            ws.onopen = empty;
            ws.onclose = empty;
            this.onSuccess(ws);
        };

        ws.onclose = () => {
            if (this.bucketTimeout[bucket]) {
                clearTimeout(this.bucketTimeout[bucket]);
                this.bucketTimeout[bucket] = null;
            }
            this.bucketTimeout[bucket] = setTimeout(() => {
                this.restartBucket(bucket);
            }, 3000);
        };

        this.bucketTimeout[bucket] = setTimeout(() => {
            this.restartBucket(bucket);
        }, timeout);
    }

    close = () => {
        if (this.closed) {
            return;
        }
        this.closed = true;

        for (let i = 0; i < this.configs.length; i++) {

            // Close Socket
            let ex = this.bucketSockets[i];
            this.bucketSockets[i] = null;
            if (ex) {
                ex.onclose = empty;
                ex.onopen = empty;
                ex.onmessage = empty;
                try {
                    ex.close();
                } catch (e) {
                    // Ignore
                }
            }

            // Clear Timeout
            if (this.bucketTimeout[i]) {
                clearTimeout(this.bucketTimeout[i]);
                this.bucketTimeout[i] = null;
            }
        }
    }
}