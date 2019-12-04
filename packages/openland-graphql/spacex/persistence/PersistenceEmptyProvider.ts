import { PersistenceProvider } from './PersistenceProvider';
import { RecordSet } from '../store/RecordStore';

export class PersistenceEmptyProvider implements PersistenceProvider {
    async saveRecords(records: RecordSet) {
        // Nothing to do
    }
    async loadRecords(keys: Set<string>) {
        // Nothing to do
        return {};
    }
}