import { WorkerInterface, WorkerEngine } from '@openland/spacex';

const W = require('./spacex.worker');

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
    let res = new WorkerEngine({ worker: threadInterface });
    console.log('completed');
    return res;
}
