import { PersistenceProvider } from '@openland/spacex/src/web/persistence/PersistenceProvider';
import { RecordSet } from '@openland/spacex/src/web/store/RecordStore';
import { PersistenceEmptyProvider } from '@openland/spacex/lib/web/persistence/PersistenceEmptyProvider';

async function iDBOpen(name: string, version: number, onUpgrade: (db: IDBDatabase) => void): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(name, version);
        openRequest.onsuccess = () => {
            resolve(openRequest.result);
        };
        openRequest.onerror = () => {
            reject(openRequest.error);
        };

        openRequest.onupgradeneeded = (event) => {
            let db: IDBDatabase = (event.target as any).result;
            let tx: IDBTransaction = (event.target as any).transaction;
            onUpgrade(db);
            tx.oncomplete = () => {
                resolve(openRequest.result);
            };
        };
    });
}

async function iDBPut(store: IDBObjectStore, value: any, key?: IDBValidKey): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
        let req = store.put(value, key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => {
            reject(req.error);
        };
    });
}

async function iDBGet(store: IDBObjectStore, query: IDBValidKey | IDBKeyRange): Promise<any> {
    return new Promise((resolve, reject) => {
        let req = store.get(query);
        req.onsuccess = () => {
            resolve(req.result);
        };
        req.onerror = () => {
            reject(req.error);
        };
    });
}

export class IndexedDBPersistenceProvider implements PersistenceProvider {
    private store: string;
    private initialized = false;
    private initializing = false;
    private db!: IDBDatabase;

    constructor(authId: string) {
        this.store = 'gql_cache.' + authId;
    }

    async saveRecords(records: RecordSet) {
        await this.init();

        let tx = this.db.transaction(this.store, 'readwrite');
        let store = tx.objectStore(this.store);

        for (let key in records) {
            if (!records.hasOwnProperty(key)) {
                continue;
            }

            let value = records[key];
            await iDBPut(store, {key, value});
        }
    }

    async loadRecords(keys: Set<string>) {
        await this.init();

        let tx = this.db.transaction(this.store, 'readonly');
        let store = tx.objectStore(this.store);

        let res: RecordSet = {};

        for (let key of [...keys]) {
            let value = await iDBGet(store, key);
            if (value && value.value) {
                res[key] = value.value;
            }
        }

        return res;
    }

    async init() {
        console.log(this.store);
        if (this.initialized || this.initializing) {
            return;
        }

        this.initializing = true;
        let db = await iDBOpen('spacex', 3, _db => {
            if (!_db.objectStoreNames.contains(this.store)) {
                _db.createObjectStore(this.store, {keyPath: 'key'});
            }
        });
        this.db = db;
        this.initialized = true;
    }
}

export function buildSpaceXPersistenceProvider(authId: string) {
    let isProd = self.location.hostname === 'openland.com';
    if (self.indexedDB && !isProd) {
        return new IndexedDBPersistenceProvider(authId);
    }
    return new PersistenceEmptyProvider();
}
