import { ThrustedSocket } from './net/ThrustedSocket';
import { GraphqlUnknownError } from '@openland/spacex';

export interface StableSocket<T> {
    onConnected: (() => void) | null;
    onDisconnected: (() => void) | null;

    onReceiveData: ((id: string, message: T) => void) | null;
    onReceiveError: ((id: string, error: any[]) => void) | null;
    onReceiveTryAgain: ((id: string, delay: number) => void) | null;
    onReceiveCompleted: ((id: string) => void) | null;

    onSessionLost: (() => void) | null;

    post(id: string, message: T): void;
    cancel(id: string): void;

    connect(): void;
    close(): void;
}

const SOCKET_TIMEOUT = 5000;
const PING_INTERVAL = 1000;

export class StableApolloSocket implements StableSocket<any> {
    private readonly endpoint: string;
    private readonly params: any;

    onReceiveData: ((id: string, message: any) => void) | null = null;
    onReceiveError: ((id: string, error: any[]) => void) | null = null;
    onReceiveTryAgain: ((id: string, delay: number) => void) | null = null;
    onReceiveCompleted: ((id: string) => void) | null = null;

    onSessionLost: (() => void) | null = null;
    onConnected: (() => void) | null = null;
    onDisconnected: (() => void) | null = null;

    private pingTimeout: any;
    private state: 'waiting' | 'connecting' | 'starting' | 'started' | 'completed' = 'waiting';
    private pending = new Map<string, any>();
    private isStarted = false;
    private isStopped = false;
    private client: ThrustedSocket | null = null;

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
            throw new GraphqlUnknownError('Unknown state: ' + this.state);
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
            throw new GraphqlUnknownError('Unknown state: ' + this.state);
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
            throw new GraphqlUnknownError('Socket was not started');
        }
        this.isStopped = true;
        this.pending.clear();
    }

    private onMessage(src: any) {
        // console.log('[WS] <<< ' + JSON.stringify(src));
        if (src.type === 'ka') {
            // Ignore
        } else if (src.type === 'connection_ack') {
            if (this.state === 'starting') {
                // Change State
                this.state = 'started';

                // Remove all pending messages
                this.pending.clear();

                console.log('[WS] Started');

                // Send Ping
                if (this.pingTimeout) {
                    clearTimeout(this.pingTimeout);
                }
                this.pingTimeout = setTimeout(() => {
                    this.writeToSocket({
                        type: 'ping'
                    });
                }, PING_INTERVAL);

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
            if (this.pingTimeout) {
                clearTimeout(this.pingTimeout);
                this.pingTimeout = null;
            }
            this.pingTimeout = setTimeout(() => {
                if (this.state === 'started') {
                    this.writeToSocket({
                        type: 'ping'
                    });
                }
            }, PING_INTERVAL);
        } else if (src.type === 'data') {
            let id = src.id as string;
            let payload = src.payload as any;
            let errors = src.errors as any;
            if (errors) {
                let shouldRetry = false;
                for (let e of errors) {
                    if (e.shouldRetry === true) {
                        shouldRetry = true;
                        break;
                    }
                }

                if (shouldRetry) {
                    if (this.onReceiveTryAgain) {
                        this.onReceiveTryAgain(id, 5000);
                    }
                } else {
                    if (this.onReceiveError) {
                        this.onReceiveError(id, errors);
                    }
                }
            } else {
                let data = payload.data;
                if (this.onReceiveData) {
                    this.onReceiveData(id, data);
                }
            }
        } else if (src.type === 'error') {
            // Critical error
            let id = src.id as string;
            if (this.onReceiveTryAgain) {
                this.onReceiveTryAgain(id, 5000);
            }
        }
    }

    private doConnect() {
        if (this.state !== 'waiting') {
            throw Error('Unexpected state');
        }

        this.state = 'connecting';
        console.log('[WS] Connecting');

        let ws = new ThrustedSocket(this.endpoint, SOCKET_TIMEOUT);
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

            let sessionLost = this.state === 'started';
            // TODO: Backoff
            this.stopClient();
            this.state = 'waiting';
            console.log('[WS] Waiting');

            if (sessionLost) {
                console.log('[WS] Session Lost');

                if (this.onDisconnected) {
                    this.onDisconnected();
                }
                if (this.onSessionLost) {
                    this.onSessionLost();
                }
            }

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
            this.onMessage(JSON.parse(m));
        };
        this.client = ws;
    }

    private stopClient() {
        let c = this.client!;
        this.client = null;
        c.onclose = null;
        c.onopen = null;
        c.onmessage = null;
        c.close();

        if (this.pingTimeout) {
            clearTimeout(this.pingTimeout);
            this.pingTimeout = null;
        }
    }

    private writeToSocket(src: any) {
        // console.log('[WS] >>> ' + JSON.stringify(src));
        this.client!.send(JSON.stringify(src));
    }
}