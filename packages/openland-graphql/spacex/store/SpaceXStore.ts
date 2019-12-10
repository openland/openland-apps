import { SpaceXPersistence } from './../persistence/SpaceXPersistence';
import { OperationDefinition } from './../types';
import { RecordStore, RecordSet, Record } from './RecordStore';
import { normalizeResponse } from './normalize';
import { readRootFromStore } from './readFromStore';
import { collectMissingKeysRoot } from './collectMissingKeys';

const ROOT_QUERY = 'ROOT_QUERY';

export type QueryAndWatchArg = { type: 'updated' } | { type: 'missing' } | { type: 'value', value: any };

export class SpaceXStore {
    private readonly store = new RecordStore();
    private readonly persistence = new SpaceXPersistence();

    // Persistence Read
    private readonly requested = new Set<string>();
    private readonly pendingReadRequests: { missing: Set<string>, callback: () => void }[] = [];

    // Persistence Write
    private isWriting = false;
    private readonly pendingWriteRequests: Map<string, Record> = new Map();

    // Subscriptions
    private nextSubscriptionId = 1;
    private subscriptions = new Map<number, { keys: Set<string>, callback: () => void }>();

    //
    // Merge to the store
    //

    mergeResponse = async (operation: OperationDefinition, variables: any, data: any) => {
        let rootCacheKey = operation.kind === 'query' ? ROOT_QUERY : null;
        let normalized = normalizeResponse(rootCacheKey, operation.selector, variables, data);
        await this.merge(normalized);
    }

    private merge = async (recordSet: RecordSet) => {
        await this.prepareMerge(recordSet);

        let changed = this.store.merge(recordSet);
        let isEmpty = Object.keys(changed).length === 0;

        // Persist
        if (!isEmpty) {
            let toWrite: RecordSet = {};
            for (let ch of Object.keys(changed)) {
                toWrite[ch] = this.store.read(ch);
            }
            this.persistenceWrite(toWrite);
        }

        // Notify
        if (!isEmpty) {
            let triggered: { keys: Set<string>, callback: () => void }[] = [];
            let keys = new Set<string>();
            for (let ch of Object.keys(changed)) {
                for (let f of Object.keys(changed[ch])) {
                    keys.add(ch + '.' + f);
                }
            }
            for (let s of this.subscriptions) {
                let isTriggered = false;
                for (let k of s[1].keys) {
                    if (keys.has(k)) {
                        isTriggered = true;
                        break;
                    }
                }
                if (isTriggered) {
                    triggered.push(s[1]);
                }
            }
            for (let f of triggered) {
                f.callback();
            }
        }
    }

    readQuery = async (operation: OperationDefinition, variables: any) => {
        await this.prepareRead(operation, variables);

        let root = readRootFromStore(ROOT_QUERY, this.store, operation.selector, variables);

        if (root.result) {
            return { result: true, value: root.value! };
        } else {
            return { result: false };
        }
    }

    readQueryAndWatch = (operation: OperationDefinition, variables: any, callback: (c: QueryAndWatchArg) => void) => {
        (async () => {
            await this.prepareRead(operation, variables);

            let root = readRootFromStore(ROOT_QUERY, this.store, operation.selector, variables);

            if (!root.result) {
                callback({ type: 'missing' });
                return;
            }

            // Calculate keys
            // TODO: Optimize
            let normalized = normalizeResponse(ROOT_QUERY, operation.selector, variables, root.value!);
            let keys = new Set<string>();
            for (let r of Object.keys(normalized)) {
                for (let f of Object.keys(normalized[r])) {
                    keys.add(r + '.' + f);
                }
            }

            // Subscribe
            let subsId = this.nextSubscriptionId++;
            this.subscriptions.set(subsId, {
                keys, callback: () => {
                    this.subscriptions.delete(subsId);
                    callback({ type: 'updated' });
                }
            });

            // Current value
            callback({ type: 'value', value: root.value! });
        })();
    }

    //
    // Read from Persistence
    //

    private readonly prepareMerge = async (recordSet: RecordSet) => {
        let missingIds: Set<string> = new Set(); // Should we avoid allocation?
        for (let k of Object.keys(recordSet)) {
            if (!this.store.isInMemory(k)) {
                missingIds.add(k);
            }
        }
        if (missingIds.size > 0) {
            await this.persistenceRead(missingIds);
        }
    }

    private readonly prepareRead = async (operation: OperationDefinition, variables: any) => {
        let missing = collectMissingKeysRoot(ROOT_QUERY, this.store, operation.selector, variables);
        if (missing.size > 0) {
            await this.persistenceRead(missing);
            await this.prepareRead(operation, variables);
        }
    }

    private readonly persistenceRead = async (keys: Set<string>) => {
        let r: () => void;
        let p = new Promise<void>((resolver) => r = resolver);
        this.pendingReadRequests.push({ missing: keys, callback: r! });

        let filtered: Set<string> = new Set();
        for (let k of keys) {
            if (!this.requested.has(k)) {
                filtered.add(k);
            }
        }

        if (filtered.size > 0) {
            this.doLoad(filtered);
        }

        await p;
    }

    private readonly doLoad = async (keys: Set<string>) => {
        for (let k of keys) {
            this.requested.add(k);
        }

        let loaded = await this.persistence.loadRecords(keys);

        // Some health check
        for (let k of keys) {
            if (!loaded[k]) {
                throw Error('Key ' + k + ' was not loaded from persistence!');
            }
        }

        this.store.loaded(loaded);

        // Notify
        for (let p of this.pendingReadRequests) {
            for (let k of keys) {
                p.missing.delete(k);
            }
        }

        let ready = this.pendingReadRequests.filter((v) => v.missing.size === 0);
        for (let r of ready) {
            let i = this.pendingReadRequests.indexOf(r);
            this.pendingReadRequests.splice(i, 1);
        }
        for (let r of ready) {
            r.callback();
        }
    }

    //
    // Write to Persistence
    //

    private readonly persistenceWrite = (records: RecordSet) => {
        for (let r of Object.keys(records)) {
            this.pendingWriteRequests.set(r, records[r]);
            this.doWriteIfNeeded();
        }
    }

    private readonly doWriteIfNeeded = async () => {
        if (this.pendingWriteRequests.size > 0 && !this.isWriting) {
            this.isWriting = true;
            let toWrite: RecordSet = {};
            for (let wr of this.pendingWriteRequests) {
                toWrite[wr[0]] = wr[1];
            }
            this.pendingWriteRequests.clear();

            try {
                await this.persistence.saveRecords(toWrite);
            } finally {
                this.isWriting = false;
                this.doWriteIfNeeded();
            }
        }
    }
}