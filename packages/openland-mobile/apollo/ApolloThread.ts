import { self } from 'react-native-threads';
import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { OpenApolloClient, buildClient } from 'openland-y-graphql/apolloClient';
import { WorkerInterface } from 'openland-graphql/proxy/WorkerInterface';
import { WorkerApolloHost } from 'openland-graphql/proxy/WorkerApolloHost';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';

var host!: WorkerApolloHost;
self.onmessage = (message: string) => {
    let msg = JSON.parse(message);
    if (msg.type !== 'init') {
        throwFatalError('Worker need to be inited first!');
    }
    let token = msg.token as string | undefined;
    let client = buildClient({
        token: token,
        endpoint: 'https://api.openland.com/api',
        wsEndpoint: 'wss://api.openland.com/api'
    });

    let workerInterface: WorkerInterface = {
        post: (src) => self.postMessage(JSON.stringify(src)),
        setHandler: (handler) => self.onmessage = (src) => handler(JSON.parse(src))
    }
    host = new WorkerApolloHost(new DirectApollolClient(client), workerInterface);
}