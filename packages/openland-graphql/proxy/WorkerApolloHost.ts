import { GraphqlClient, GraphqlQueryWatch, GraphqlActiveSubscription, ApiError } from "openland-graphql/GraphqlClient";
import { WorkerInterface } from './WorkerInterface';
import { WorkerRequest, WorkerResponse } from './api/WorkerApi';
import { randomKey } from 'openland-graphql/utils/randomKey';

export class WorkerApolloHost {
    private worker: WorkerInterface;
    private client: GraphqlClient;
    private watches = new Map<string, () => void>();
    private subscriptions = new Map<string, GraphqlActiveSubscription<any, {}>>();

    constructor(client: GraphqlClient, worker: WorkerInterface) {
        this.worker = worker;
        this.client = client;
        this.client.watchStatus((status) => {
            this.postMessage({ id: randomKey(), type: 'status', status: status.status });
        })
        this.worker.setHandler((msg) => {
            this.handleMessage(msg);
        });
    }

    private handleMessage = (msg: WorkerRequest) => {
        if (msg.type === 'query') {
            this.client.query(msg.body, msg.variables, msg.params).then((v) => {
                this.postResult(msg.id, v);
            }).catch((v) => {
                this.postError(msg.id, v);
            });
        } else if (msg.type === 'mutate') {
            this.client.mutate(msg.body, msg.variables).then((v) => {
                this.postResult(msg.id, v);
            }).catch((v) => {
                this.postError(msg.id, v);
            });
        } else if (msg.type === 'read') {
            this.client.readQuery(msg.body, msg.variables).then((v) => {
                this.postResult(msg.id, v);
            }).catch((v) => {
                this.postError(msg.id, v);
            });
        } else if (msg.type === 'write') {
            this.client.writeQuery(msg.data, msg.body, msg.variables).then((v) => {
                this.postResult(msg.id, v);
            }).catch((v) => {
                this.postError(msg.id, v);
            });
        } else if (msg.type === 'write-fragment') {
            this.client.writeFragment(msg.data, msg.body).then((v) => {
                this.postResult(msg.id, v);
            }).catch((v) => {
                this.postError(msg.id, v);
            })
        } else if (msg.type === 'watch') {
            let id = msg.id;
            let watch = this.client.queryWatch(msg.body, msg.variables, msg.params);
            let current = watch.currentResult();
            if (current) {
                if (current.error) {
                    this.postError(id, current.error);
                } else if (current.data) {
                    this.postResult(id, current.data);
                }
            }
            let res = watch.subscribe(({ data, error }) => {
                if (error) {
                    this.postError(id, error);
                } else {
                    this.postResult(id, data);
                }
            });
            this.watches.set(msg.id, res);
        } else if (msg.type === 'watch-destroy') {
            this.watches.get(msg.id)!!();
            this.watches.delete(msg.id);
        } else if (msg.type === 'subscribe') {
            let id = msg.id;
            let subscription = this.client.subscribe(msg.body, msg.variables);
            this.subscriptions.set(id, subscription);
            (async () => {
                while (true) {
                    let v = await subscription.get();
                    this.postResult(id, v);
                }
            })();
        } else if (msg.type === 'subscribe-update') {
            this.subscriptions.get(msg.id)!!.updateVariables(msg.variables);
        } else if (msg.type === 'subscribe-destroy') {
            this.subscriptions.get(msg.id)!!.destroy();
            this.subscriptions.delete(msg.id);
        }
    }

    private postResult(id: string, data: any) {
        this.postMessage({ id: id, type: 'result', data });
    }
    private postError(id: string, error: any) {
        if (error instanceof ApiError) {
            this.postMessage({
                type: 'error',
                id: id,
                data: {
                    __api: true,
                    message: error.message,
                    invalidFields: error.invalidFields
                }
            });
        } else {
            this.postMessage({ type: 'error', id: id, data: {} });
        }
    }
    private postMessage = (msg: WorkerResponse) => {
        this.worker.post(msg);
    }
}