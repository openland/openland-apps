import { NativeModules, DeviceEventEmitter, NativeEventEmitter, Platform } from 'react-native';
import { GraphqlBridgedEngine, OperationParameters } from '@openland/spacex';
import { randomKey } from 'openland-graphql/utils/randomKey';
import { API_HOST } from 'openland-y-utils/api';
import { GraphqlUnknownError, GraphqlError } from '@openland/spacex';

const NativeGraphQL = NativeModules.RNGraphQL as {
    createClient: (key: string, endpoint: string, token?: string, storage?: string) => void
    closeClient: (key: string) => void;

    query: (key: string, id: string, query: string, vars: any, params: any) => void;
    watch: (key: string, id: string, query: string, vars: any, params: any) => void;
    watchEnd: (key: string, id: string) => void;

    mutate: (key: string, id: string, query: string, vars: any) => void;

    subscribe: (key: string, id: string, query: string, vars: any) => void;
    subscribeUpdate: (key: string, id: string, vars: any) => void;
    unsubscribe: (key: string, id: string) => void;

    read: (key: string, id: string, query: string, vars: any) => void;
    write: (key: string, id: string, data: any, query: string, vars: any) => void;
};

const RNGraphQLEmitter = new NativeEventEmitter(NativeModules.RNGraphQL);

export class NativeSpaceXClient extends GraphqlBridgedEngine {
    private key: string = randomKey();

    constructor(storageKey?: string, token?: string) {
        super();
        if (Platform.OS === 'ios') {
            RNGraphQLEmitter.addListener('graphql_client', (src) => {
                if (src.key === this.key) {
                    if (src.type === 'failure') {
                        if (src.kind === 'graphql') {
                            this.operationFailed(src.id, new GraphqlError(src.data));
                        } else {
                            this.operationFailed(src.id, new GraphqlUnknownError('Unknown error'));
                        }
                    } else if (src.type === 'response') {
                        this.operationUpdated(src.id, src.data);
                    } else if (src.type === 'status') {
                        this.statusWatcher.setState({ status: src.status });
                    }
                }
            });
        } else {
            DeviceEventEmitter.addListener('graphql_client', (src) => {
                if (src.key === this.key) {
                    if (src.type === 'failure') {
                        if (src.kind === 'graphql') {
                            this.operationFailed(src.id, new GraphqlError(src.data));
                        } else {
                            this.operationFailed(src.id, new GraphqlUnknownError('Unknown error'));
                        }
                    } else if (src.type === 'response') {
                        this.operationUpdated(src.id, src.data);
                    } else if (src.type === 'status') {
                        this.statusWatcher.setState({ status: src.status });
                    }
                }
            });
        }
        if (storageKey) {
            NativeGraphQL.createClient(this.key, '//' + API_HOST + '/api', token, 'gql-' + storageKey);
        } else {
            NativeGraphQL.createClient(this.key, '//' + API_HOST + '/api', token, undefined);
        }
    }

    close() {
        NativeGraphQL.closeClient(this.key);
    }

    protected postQuery(id: string, query: string, vars: any, params?: OperationParameters) {
        NativeGraphQL.query(this.key, id, query, vars ? vars : {}, params ? params : {});
    }
    protected postQueryWatch(id: string, query: string, vars: any, params?: OperationParameters) {
        NativeGraphQL.watch(this.key, id, query, vars ? vars : {}, params ? params : {});
    }
    protected postQueryWatchEnd(id: string) {
        NativeGraphQL.watchEnd(this.key, id);
    }

    protected postMutation(id: string, query: string, vars: any) {
        NativeGraphQL.mutate(this.key, id, query, vars ? vars : {});
    }

    protected postSubscribe(id: string, query: string, vars: any) {
        NativeGraphQL.subscribe(this.key, id, query, vars ? vars : {});
    }
    protected postUnsubscribe(id: string) {
        NativeGraphQL.unsubscribe(this.key, id);
    }

    protected postReadQuery(id: string, query: string, vars: any) {
        NativeGraphQL.read(this.key, id, query, vars ? vars : {});
    }
    protected postWriteQuery(id: string, data: any, query: string, vars: any) {
        NativeGraphQL.write(this.key, id, data, query, vars ? vars : {});
    }
}