import { OperationDefinition } from './../types';
// import { PersistenceEmptyProvider } from './../persistence/PersistenceEmptyProvider';
// import { PersistenceProvider } from './../persistence/PersistenceProvider';
import { RecordStore, RecordSet } from './RecordStore';
import { normalizeResponse } from './normalize';
import { readRootFromStore } from './readFromStore';

const ROOT_QUERY = 'ROOT_QUERY';

export class SpaceXStore {
    private readonly store = new RecordStore();
    // private readonly persitence: PersistenceProvider = new PersistenceEmptyProvider();

    //
    // Merge to the store
    //

    mergeResponse = async (operation: OperationDefinition, variables: any, data: any) => {
        let rootCacheKey = operation.kind === 'query' ? ROOT_QUERY : null;
        let normalized = normalizeResponse(rootCacheKey, operation.selector, variables, data);
        await this.merge(normalized);
    }

    private merge = async (recordSet: RecordSet) => {
        // TODO: Prepare RAM store

        let changed = this.store.merge(recordSet);
        let isEmpty = Object.keys(changed).length === 0;

        if (!isEmpty) {
            // TODO: Write to persistence
        }

        if (!isEmpty) {
            // TODO: Notify subscriptions
        }
    }

    readQuery = async (operation: OperationDefinition, variables: any) => {
        // TODO: Prepare RAM store

        let root = readRootFromStore(ROOT_QUERY, this.store, operation.selector, variables);

        if (root.result) {
            return { result: true, value: root.value! };
        } else {
            return { result: false };
        }
    }
}