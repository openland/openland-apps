import { TransportServiceLayer } from './TransportServiceLayer';
import { OperationDefinition } from './../types';
import { GraphqlClientStatus } from 'openland-graphql/GraphqlClient';

export type TransportResult = { type: 'result', value: any } | { type: 'error', errors: any[] } | { type: 'completed' };

export class SpaceXTransport {

    readonly token?: string;
    readonly endpoint: string;
    private readonly serviceLayer: TransportServiceLayer;
    onStatusChanged: ((status: GraphqlClientStatus) => void) | null = null;

    constructor(endpoint: string, token?: string) {
        this.endpoint = endpoint;
        this.token = token;
        this.serviceLayer = new TransportServiceLayer(endpoint, token);
        this.serviceLayer.onStatusChanged = (status) => {
            if (this.onStatusChanged) {
                this.onStatusChanged(status);
            }
        };
    }

    operation = async (operation: OperationDefinition, vars: any): Promise<TransportResult> => {
        let completed = false;
        return await new Promise<TransportResult>((resolve, reject) => this.serviceLayer.operation(operation, vars, (res) => {
            if (res.type === 'result' || res.type === 'error') {
                if (!completed) {
                    completed = true;
                    resolve(res);
                }
            }
        }));
    }

    subscription = (operation: OperationDefinition, vars: any, callback: (result: TransportResult) => void): (() => void) => {
        return this.serviceLayer.operation(operation, vars, callback);
    }
}
