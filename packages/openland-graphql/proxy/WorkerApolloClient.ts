import { OperationParameters, ApiError } from 'openland-graphql/GraphqlClient';
import { WorkerInterface } from './WorkerInterface';
import { WorkerResponse, WorkerRequest } from './api/WorkerApi';
import { BridgedClient } from '../bridge/BridgedClient';

export class WorkerApolloClient extends BridgedClient {

    private readonly bridge: WorkerInterface;

    constructor(bridge: WorkerInterface) {
        super();
        this.bridge = bridge;
        this.bridge.setHandler((msg: any) => {
            this.handleMessage(msg);
        });
    }

    protected postQuery(id: string, query: any, vars: any, params?: OperationParameters) {
        this.postMessage({ type: 'query', id, body: query, variables: vars, params });
    }
    protected postQueryWatch(id: string, query: any, vars: any, params?: OperationParameters) {
        this.postMessage({ type: 'watch', id, body: query, variables: vars, params });
    }
    protected postQueryWatchEnd(id: string) {
        this.postMessage({ type: 'watch-destroy', id });
    }

    protected postMutation(id: string, query: any, vars: any) {
        this.postMessage({ type: 'mutate', id, body: query, variables: vars });
    }

    protected postSubscribe(id: string, query: any, vars: any) {
        this.postMessage({ type: 'subscribe', id, body: query, variables: vars });
    }
    protected postSubscribeUpdate(id: string, vars: any) {
        this.postMessage({ type: 'subscribe-update', id, variables: vars });
    }
    protected postUnsubscribe(id: string) {
        this.postMessage({ type: 'subscribe-destroy', id });
    }

    protected postReadQuery(id: string, query: any, vars: any) {
        this.postMessage({ type: 'read', id, body: query, variables: vars });
    }
    protected postWriteQuery(id: string, data: any, query: any, vars: any) {
        this.postMessage({ type: 'write', id, body: query, variables: vars, data });
    }
    protected postWriteFragment(id: string, data: any, fragment: any) {
        this.postMessage({ type: 'write-fragment', id, body: fragment, data });
    }

    private handleMessage(msg: WorkerResponse) {
        if (msg.type === 'result') {
            this.operationUpdated(msg.id, msg.data);
        } else if (msg.type === 'error') {
            if (msg.data.__api) {
                this.operationFailed(msg.id, new ApiError(msg.data.message, msg.data.invalidFields));
            } else {
                this.operationFailed(msg.id, msg.data);
            }
        }
    }

    private postMessage(request: WorkerRequest) {
        this.bridge.post(request);
    }
}