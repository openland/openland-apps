import { StableSocket } from './StableSocket';

export interface StableSocket<T> {
    onConnected: (() => void) | null;
    onDisconnected: (() => void) | null;
    onReceiveData: ((id: string, message: T) => void) | null;
    onSessionLost: (() => void) | null;

    post(id: string, message: T): void;
    cancel(id: string): void;

    connect(): void;
    close(): void;
}

export class StableApolloSocket implements StableSocket<any> {
    private readonly endpoint: string;
    private readonly params: any;

    onReceiveData: ((id: string, message: any) => void) | null = null;
    onSessionLost: (() => void) | null = null;
    onConnected: (() => void) | null = null;
    onDisconnected: (() => void) | null = null;

    private state: 'waiting' | 'connecting' | 'starting' | 'started' | 'completed' = 'waiting';
    private pending = new Map<string, any>();
    private isStarted = false;
    private isStopped = false;
    private client: WebSocket | null = null;

    constructor(endpoint: string, params: any) {
        this.endpoint = endpoint;
        this.params = params;
    }

    post(id: string, message: any) {
        if (this.state === 'waiting' || this.state === 'connecting') {

            // Add to pending buffer if we are not connected already
            this.pending.set(id, message);
        } else if (this.state === 'starting') {

            // If we connected, but not started add to pending buffer (in case of failed start)
            // and send message to socket
            this.pending.set(id, message);

            this.writeToSocket({
                type: 'start',
                'id': id,
                'payload': message
            });
        } else if (this.state === 'started') {
            this.writeToSocket({
                type: 'start',
                'id': id,
                'payload': message
            });
        } else if (this.state === 'completed') {
            // Silently ignore if connection is completed
        } else {
            throw Error('Unknown state: ' + this.state);
        }
    }

    cancel(id: string) {
        if (this.state === 'waiting' || this.state === 'connecting') {
            // Remove from pending buffer if we are not connected already
            this.pending.delete(id);
        } else if (this.state === 'starting') {
            // If we connected, but not started remove from pending buffer (in case of failed start)
            // and send cancellation message to socket
            this.pending.delete(id);
            this.writeToSocket({
                type: 'stop',
                'id': id
            });
        } else if (this.state === 'started') {
            this.writeToSocket({
                type: 'stop',
                'id': id
            });
        } else if (this.state === 'completed') {
            // Silently ignore if connection is completed
        } else {
            throw Error('Unknown state: ' + this.state);
        }
    }

    connect() {
        if (this.isStarted) {
            return;
        }
        this.isStarted = true;
        this.doConnect();
    }

    close() {
        if (this.isStopped) {
            return;
        }
        if (!this.isStarted) {
            throw Error('Socket was not started');
        }
        this.isStopped = true;
        this.pending.clear();
    }

    private onMessage(src: any) {
        console.log('[WS] <<< ' + JSON.stringify(src));
        if (src.type === 'ka') {
            // Ignore
        } else if (src.type === 'connection_ack') {
            if (this.state === 'starting') {
                // Change State
                this.state = 'started';

                // Remove all pending messages
                this.pending.clear();

                console.log('[WS] Started');

                // TODO: Reset backoff
                if (this.onConnected) {
                    this.onConnected();
                }
            }
        } else if (src.type === 'ping') {
            this.writeToSocket({
                type: 'pong'
            });
        } else if (src.type === 'pong') {
            // TODO: Implement
        } else if (src.type === 'data') {
            let id = src.id as string;
            let payload = src.payload as any;
            let errors = src.errors as any;
            if (errors) {
                // TODO: Implement
            } else {
                let data = payload.data;
                if (this.onReceiveData) {
                    this.onReceiveData(id, data);
                }
            }
        }
    }

    private doConnect() {
        if (this.state !== 'waiting') {
            throw Error('Unexpected state');
        }

        this.state = 'connecting';
        console.log('[WS] Connecting');

        let ws = new WebSocket(this.endpoint);
        ws.onopen = () => {
            if (this.client !== ws) {
                return;
            }
            if (this.state !== 'connecting') {
                throw Error('Unexpected state');
            }
            this.state = 'starting';
            console.log('[WS] Starting');

            this.writeToSocket({
                protocol_v: 2,
                type: 'connection_init',
                'payload': this.params
            });

            for (let p of this.pending) {
                this.writeToSocket({
                    type: 'start',
                    id: p[0],
                    payload: p[1]
                });
            }
        };
        ws.onclose = () => {
            if (this.client !== ws) {
                return;
            }
            if (this.state === 'started') {
                console.log('[WS] Disconnected');
                console.log('[WS] Session Lost');

                if (this.onDisconnected) {
                    this.onDisconnected();
                }
                if (this.onSessionLost) {
                    this.onSessionLost();
                }
            }

            // TODO: Backoff
            this.stopClient();
            this.state = 'waiting';
            console.log('[WS] Waiting');

            setTimeout(() => {
                if (this.state === 'waiting') {
                    this.doConnect();
                }
            }, 1000);
        };
        ws.onmessage = (m) => {
            if (this.client !== ws) {
                return;
            }
            this.onMessage(JSON.parse(m.data));
        };
        this.client = ws;
    }

    private stopClient() {
        let c = this.client!;
        this.client = null;
        c.onclose = null;
        c.onerror = null;
        c.onmessage = null;
        c.close();
    }

    private writeToSocket(src: any) {
        console.log('[WS] >>> ' + JSON.stringify(src));
        this.client!.send(JSON.stringify(src));
    }
}