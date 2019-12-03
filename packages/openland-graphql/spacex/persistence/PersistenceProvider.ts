import { RecordSet } from '../store/RecordStore';

export interface PersistenceProvider {
    saveRecords(records: RecordSet): Promise<void>;
    loadRecords(keys: string[]): Promise<RecordSet>;
}