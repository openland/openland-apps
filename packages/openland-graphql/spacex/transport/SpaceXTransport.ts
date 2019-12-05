import { OperationDefinition } from './../types';

export type TransportResult = { type: 'result', value: any } | { type: 'error', error: any[] };

export class SpaceXTransport {

    readonly token: string;
    readonly endpoint: string;

    constructor(endpoint: string, token: string) {
        this.endpoint = endpoint;
        this.token = token;
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
