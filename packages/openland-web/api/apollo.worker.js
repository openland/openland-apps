import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { buildClient } from 'openland-y-graphql/apolloClient';
import { WorkerApolloHost } from 'openland-graphql/proxy/WorkerApolloHost';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';

const ctx = self;

var host;

const initHandler = (ev) => {
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

    let workerInterface = {
        post: (src) => ctx.postMessage(src),
        setHandler: (handler) => ctx.addEventListener('message', (src) => handler(src.data))
    }

    host = new WorkerApolloHost(new DirectApollolClient(client), workerInterface);
};

ctx.addEventListener('message', initHandler);