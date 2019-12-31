import { Operations } from './../../openland-api/Client';
import { SpaceXWebClient } from './../../openland-graphql/spacex/SpaceXWebClient';
import { disableTag, disableAll } from 'mental-log';
disableAll();
disableTag('GraphQL-Direct');

import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { WorkerHost } from 'openland-graphql/proxy/WorkerHost';
import { WorkerInterface } from 'openland-graphql/proxy/WorkerInterface';

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
    host = new WorkerHost(new SpaceXWebClient(Operations, msg.wsEndpoint, msg.token), workerInterface);
};

ctx.addEventListener('message', initHandler);

console.log('started');
