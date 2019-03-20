import { BridgedClient } from 'openland-graphql/bridge/BridgedClient';
import { OperationParameters } from 'openland-graphql/GraphqlClient';
import { NativeModules, DeviceEventEmitter } from 'react-native';
import { randomKey } from 'openland-graphql/utils/randomKey';

const NativeGraphQL = NativeModules.RNGraphQL as {
    createClient: (key: string, endpoint: string, token?: string) => void
    closeClient: (key: string) => void;

    query: (key: string, id: string, query: string, vars?: any, params?: any) => void;
    watch: (key: string, id: string, query: string, vars?: any, params?: any) => void;
    watchEnd: (key: string, id: string) => void;

    mutate: (key: string, id: string, query: string, vars?: any) => void;

    subscribe: (key: string, id: string, query: string, vars?: any) => void;
    subscribeUpdate: (key: string, id: string, vars?: any) => void;
    unsubscribe: (key: string, id: string) => void;

    read: (key: string, id: string, query: string, vars?: any) => void;
    write: (key: string, id: string, data: any, query: string, vars?: any) => void;
}

export class NativeApolloClient extends BridgedClient {
    private key: string = randomKey();

    constructor(token?: string) {
        super();
        NativeGraphQL.createClient(this.key, '//api.openland.com/api', token);

        DeviceEventEmitter.addListener('apollo_client', (src) => {
            if (src.key === this.key) {
                if (src.type === 'failure') {
                    this.operationFailed(src.id, src.data);
                } else if (src.type === 'response') {
                    this.operationUpdated(src.id, src.data);
                }
            }
        });
    }

    protected postQuery(id: string, query: any, vars: any, params?: OperationParameters) {
        let name = query.document.definitions[0].name.value;
        NativeGraphQL.query(this.key, id, name, vars ? vars : {}, params ? params : {});
    }
    protected postQueryWatch(id: string, query: any, vars: any, params?: OperationParameters) {
        let name = query.document.definitions[0].name.value;
        NativeGraphQL.watch(this.key, id, name, vars ? vars : {}, params ? params : {});
    }
    protected postQueryWatchEnd(id: string) {
        NativeGraphQL.watchEnd(this.key, id);
    }

    protected postMutation(id: string, query: any, vars: any) {
        let name = query.document.definitions[0].name.value;
        NativeGraphQL.mutate(this.key, id, name, vars ? vars : {});
    }

    protected postSubscribe(id: string, query: any, vars: any) {
        let name = query.document.definitions[0].name.value;
        NativeGraphQL.subscribe(this.key, id, name, vars ? vars : {});
    }
    protected postSubscribeUpdate(id: string, vars: any) {
        NativeGraphQL.subscribeUpdate(this.key, id, vars ? vars : {});
    }
    protected postUnsubscribe(id: string) {
        NativeGraphQL.unsubscribe(this.key, id);
    }

    protected postReadQuery(id: string, query: any, vars: any) {
        let name = query.document.definitions[0].name.value;
        NativeGraphQL.read(this.key, id, name, vars ? vars : {});
    }
    protected postWriteQuery(id: string, data: any, query: any, vars: any) {
        let name = query.document.definitions[0].name.value;
        NativeGraphQL.write(this.key, data, id, name, vars ? vars : {});
    }
}