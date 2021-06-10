import { WorkerInterface, WorkerEngine } from '@openland/spacex-web';

const W = require('./spacex.worker');

export function createEngineWebWorker(endpoint: string, generation: number, token?: string) {
    console.log('creating client');
    let thread: Worker = new W();
    thread.onerror = e => {
        console.error(e);
    };
    thread.postMessage({ type: 'init', token, endpoint, generation });
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
