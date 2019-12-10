import { TransportServiceLayer } from './TransportServiceLayer';
import { OperationDefinition } from './../types';

export type TransportResult = { type: 'result', value: any } | { type: 'error', error: any[] };

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
