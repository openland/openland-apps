import { StableSocket, StableApolloSocket } from './StableSocket';
import { OperationDefinition } from './../types';

export type TransportResult = { type: 'result', value: any } | { type: 'error', error: any[] };

export class SpaceXTransport {

    readonly token?: string;
    readonly endpoint: string;
    readonly socket: StableSocket<any>;

    constructor(endpoint: string, token?: string) {
        this.endpoint = endpoint;
        this.token = token;
        this.socket = new StableApolloSocket(endpoint, token ? { 'x-openland-token': token } : {});
        this.socket.onConnected = () => {
            //
        };
        this.socket.onDisconnected = () => {
            //
        };
        this.socket.onReceive = () => {
            //
        };
        this.socket.onSessionLost = () => {
            //
        };
        this.socket.connect();
    }

    operation = async (operation: OperationDefinition, vars: any): Promise<TransportResult> => {
        await new Promise(() => {/* */ });
        throw Error('');
    }

    subscription = (operation: OperationDefinition, vars: any, callback: (result: TransportResult) => void): (() => void) => {
        //
        return () => {
            //
        };
    }
}
