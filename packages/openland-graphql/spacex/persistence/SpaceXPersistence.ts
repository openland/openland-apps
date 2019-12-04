import { PersistenceProvider } from './PersistenceProvider';
import { PersistenceEmptyProvider } from './PersistenceEmptyProvider';
import { RecordSet } from '../store/RecordStore';

export class SpaceXPersistence {
    private readonly persistence: PersistenceProvider = new PersistenceEmptyProvider();

    async saveRecords(records: RecordSet): Promise<void> {
        await this.persistence.saveRecords(records);
    }

    async loadRecords(keys: Set<string>): Promise<RecordSet> {
        let loaded = await this.persistence.loadRecords(keys);
        let r: RecordSet = {};
        for (let s of keys) {
            let ex = loaded[s];
            if (ex) {
                r[s] = ex;
            } else {
                r[s] = { key: s, fields: {} };
            }
        }
        return r;
    }
}