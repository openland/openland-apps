import { WorkerInterface, WorkerEngine } from '@openland/spacex';

const W = require('./spacex.worker');

export function createEngineWebWorker(endpoint: string, token?: string) {
    console.log('creating client');
    let thread: Worker = new W();
    thread.onerror = e => {
        console.error(e);
    };
    thread.postMessage({ type: 'init', token, endpoint });
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
