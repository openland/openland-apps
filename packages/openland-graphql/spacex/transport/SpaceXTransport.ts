import { TransportServiceLayer } from './TransportServiceLayer';
import { StableSocket, StableApolloSocket } from './StableSocket';
import { OperationDefinition } from './../types';

export type TransportResult = { type: 'result', value: any } | { type: 'error', error: any[] };

type PendingOperation = { id: string, reqiestId: string, operation: OperationDefinition, variables: any, callback: (result: TransportResult) => void };

export class SpaceXTransport {

    readonly token?: string;
    readonly endpoint: string;
    private readonly serviceLayer: TransportServiceLayer;

    constructor(endpoint: string, token?: string) {
        this.endpoint = endpoint;
        this.token = token;
        this.serviceLayer = new TransportServiceLayer(endpoint, token);
    }

    operation = async (operation: OperationDefinition, vars: any): Promise<TransportResult> => {
        let completed = false;
        return await new Promise<TransportResult>((resolve, reject) => this.serviceLayer.operation(operation, vars, (res) => {
            if (!completed) {
                completed = true;
                resolve(res);
            }
        }));
    }

    subscription = (operation: OperationDefinition, vars: any, callback: (result: TransportResult) => void): (() => void) => {
        //
        return () => {
            //
        };
    }
}
