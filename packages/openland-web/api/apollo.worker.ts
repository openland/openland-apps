console.log('starting');

import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { buildClient } from 'openland-y-graphql/apolloClient';
import { WorkerApolloHost } from 'openland-graphql/proxy/WorkerApolloHost';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';
import { WorkerInterface } from 'openland-graphql/proxy/WorkerInterface';

const ctx = self as any;

var host;

const initHandler = (ev: MessageEvent) => {
    console.log('handler!');
    let msg = ev.data
    if (msg.type !== 'init') {
        throwFatalError('Worker need to be inited first!');
    }

    ctx.removeEventListener('message', initHandler);

    let token = msg.token;
    let client = buildClient({
        token: token,
        endpoint: msg.endpoint,
        wsEndpoint: msg.wsEndpoint
    });

    let workerInterface: WorkerInterface = {
        post: (src) => ctx.postMessage(src),
        setHandler: (handler) => ctx.addEventListener('message', (src: any) => handler(src.data))
    }

    host = new WorkerApolloHost(new DirectApollolClient(client), workerInterface);
};

ctx.addEventListener('message', initHandler);

console.log('started');