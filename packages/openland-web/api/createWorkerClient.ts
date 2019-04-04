import Worker from "worker-loader!./apollo.worker.js";
import { WorkerInterface } from 'openland-graphql/proxy/WorkerInterface';
import { WorkerApolloClient } from 'openland-graphql/proxy/WorkerApolloClient';

export function createWorkerClient(endpoint: string, wsEndpoint: string, token?: string) {
    let thread: Worker = new Worker();
    thread.postMessage(JSON.stringify({ type: 'init', token, endpoint, wsEndpoint }));
    let threadInterface: WorkerInterface = {
        post: (src) => thread.postMessage(src),
        setHandler: (handler) => thread.onmessage = (src) => handler(src.data)
    }
    return new WorkerApolloClient(threadInterface);
}