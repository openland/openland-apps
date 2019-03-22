import { Thread } from 'react-native-threads';
import { WorkerInterface } from 'openland-graphql/proxy/WorkerInterface';
import { WorkerApolloClient } from 'openland-graphql/proxy/WorkerApolloClient';

export function createWorkerClient(token?: string) {
    let thread: Thread = new Thread('./index.thread.js');
    thread.postMessage(JSON.stringify({ type: 'init', token }));
    let threadInterface: WorkerInterface = {
        post: (src) => thread.postMessage(JSON.stringify(src)),
        setHandler: (handler) => thread.onmessage = (src) => handler(JSON.parse(src))
    }
    return new WorkerApolloClient(threadInterface);
}