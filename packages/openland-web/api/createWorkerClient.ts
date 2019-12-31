const W = require('./apollo.worker');
import { WorkerInterface } from 'openland-graphql/proxy/WorkerInterface';
import { WorkerClient } from 'openland-graphql/proxy/WorkerClient';

export function createWorkerClient(endpoint: string, wsEndpoint: string, token?: string) {
    console.log('creating client');
    let thread: Worker = new W();
    thread.onerror = e => {
        console.error(e);
    };
    thread.postMessage({ type: 'init', token, endpoint, wsEndpoint });
    let threadInterface: WorkerInterface = {
        post: src => thread.postMessage(src),
        setHandler: handler =>
            (thread.onmessage = src => {
                // console.log(src)
                handler(src.data);
            }),
    };
    let res = new WorkerClient(threadInterface);
    console.log('completed');
    return res;
}
