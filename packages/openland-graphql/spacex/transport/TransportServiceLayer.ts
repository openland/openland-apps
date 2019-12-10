import { StableSocket, StableApolloSocket } from './StableSocket';
import { OperationDefinition } from './../types';
import { TransportResult } from './SpaceXTransport';

type PendingOperation = { id: string, reqiestId: string, operation: OperationDefinition, variables: any, callback: (result: TransportResult) => void };

export class TransportServiceLayer {
    private nextId = 1;
    private readonly liveOperations = new Map<string, PendingOperation>();
    private readonly liveOperationsIds = new Map<string, string>();
    private readonly socket: StableSocket<any>;

    constructor(endpoint: string, token?: string) {
        this.socket = new StableApolloSocket(endpoint, token ? { 'x-openland-token': token } : {});
        this.socket.onConnected = () => {
            console.log('[TX] Connected');
        };
        this.socket.onDisconnected = () => {
            console.log('[TX] Disconnected');
        };
        this.socket.onReceiveData = (id, msg) => {
            let rid = this.liveOperationsIds.get(id);
            if (rid) {
                let op = this.liveOperations.get(rid);
                if (op) {
                    op.callback({ type: 'result', value: msg });
                }
            }
        };
        this.socket.onSessionLost = () => {
            console.log('[TX] Session lost');
        };
        this.socket.connect();
    }

    operation = (operation: OperationDefinition, variables: any, callback: (result: TransportResult) => void) => {
        let id = (this.nextId++).toString();
        let op: PendingOperation = { id: id, reqiestId: id, operation, variables, callback };

        this.liveOperations.set(id, op);
        this.liveOperationsIds.set(id, id);

        this.flushQueryStart(op);

        return () => {
            if (this.liveOperations.has(id)) {
                this.liveOperations.delete(id);
                this.liveOperationsIds.delete(op.reqiestId);
                this.flushQueryStop(op);
            }
        };
    }

    private flushQueryStart(op: PendingOperation) {
        this.socket.post(op.reqiestId, {
            query: op.operation.body,
            name: op.operation.name,
            variables: op.variables
        });
    }

    private flushQueryStop(op: PendingOperation) {
        this.socket.cancel(op.reqiestId);
    }
}