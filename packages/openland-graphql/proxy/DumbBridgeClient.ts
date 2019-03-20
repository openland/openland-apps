import { GraphqlClient } from "openland-graphql/GraphqlClient";
import { WorkerInterface } from './WorkerInterface';
import { WorkerApolloHost } from './WorkerApolloHost';
import { WorkerApolloClient } from './WorkerApolloClient';

export function createDumbBridgeClient(client: GraphqlClient) {

    let hostCallback!: (src: any) => void
    let clientCallback!: (src: any) => void

    let hostWorkerInterface: WorkerInterface = {
        post: (src) => {
            let conv = JSON.parse(JSON.stringify(src));
            console.log('<<<', conv);
            setTimeout(() => clientCallback(conv), 1)
        },
        setHandler: (handler) => hostCallback = handler
    }
    let clientWorkerInterface: WorkerInterface = {
        post: (src) => {
            let conv = JSON.parse(JSON.stringify(src));
            console.log('>>>', conv);
            setTimeout(() => hostCallback(conv), 1)
        },
        setHandler: (handler) => clientCallback = handler
    }

    let host = new WorkerApolloHost(client, hostWorkerInterface);
    return new WorkerApolloClient(clientWorkerInterface);
}