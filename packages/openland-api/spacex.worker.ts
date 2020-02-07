import { Definitions } from './spacex.web';
import { disableTag, disableAll } from 'mental-log';
disableAll();
disableTag('GraphQL-Direct');

import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { WorkerInterface, WorkerHost, WebEngine } from '@openland/spacex';

const ctx = self as any;

// tslint:disable-next-line
var host;

const initHandler = (ev: MessageEvent) => {

    // Init
    let msg = ev.data;
    if (msg.type !== 'init') {
        throwFatalError('Worker need to be inited first!');
    }
    ctx.removeEventListener('message', initHandler);

    // Define Worker Interface
    let workerInterface: WorkerInterface = {
        post: src => ctx.postMessage(src),
        setHandler: handler => ctx.addEventListener('message', (src: any) => handler(src.data)),
    };

    // Create Host
    host = new WorkerHost({
        engine: new WebEngine(Definitions, {
            endpoint: msg.endpoint,
            connectionParams: msg.token && { ['openland-x-token']: msg.token }
        }),
        worker: workerInterface
    });
};

ctx.addEventListener('message', initHandler);

console.log('started');
