import { PersistenceProvider } from '@openland/spacex/lib/web/persistence/PersistenceProvider';
import { RecordSet } from '@openland/spacex/lib/web/store/RecordStore';
import Dexie, { Table } from 'dexie';
import { PersistenceEmptyProvider } from '@openland/spacex/lib/web/persistence/PersistenceEmptyProvider';

async function getDB(authId: string) {
    let db = new Dexie('spacex');
    let store = 'gql_cache_' + authId;
    db.version(1).stores({
        [store]: 'key'
    });

    return db.open();
}

export class DexiePersistenceProvider implements PersistenceProvider {
    private store: string;
    private authId: string;
    private initialized = false;
    private db!: Dexie;
    private table!: Table;

    constructor(authId: string) {
        this.authId = authId;
        this.store = 'gql_cache_' + authId;
    }

    async saveRecords(records: RecordSet) {
        await this.init();

        await this.db.transaction('rw', this.table, async () => {
            let itemsToAdd: any[] = [];

            for (let key in records) {
                if (!records.hasOwnProperty(key)) {
                    continue;
                }
                itemsToAdd.push(records[key]);
            }

            await this.table.bulkPut(itemsToAdd);
        });
    }

    async loadRecords(keys: Set<string>) {
        await this.init();

        return this.db.transaction('r', this.table, async () => {
            let res: RecordSet = {};
            let records = (await this.table.bulkGet([...keys])).filter(v => !!v);
            for (let record of records) {
                res[record.key] = record;
            }

            return res;
        });
    }

    async init() {
        if (this.initialized ) {
            return;
        }
        this.initialized = true;

        this.db = await getDB(this.authId);
        this.table = this.db.table(this.store);
    }
}

export function buildSpaceXPersistenceProvider(authId: string) {
    let isProd = self.location.hostname === 'openland.com';
    if (self.indexedDB && !isProd) {
        return new DexiePersistenceProvider(authId);
    }
    return new PersistenceEmptyProvider();
}
