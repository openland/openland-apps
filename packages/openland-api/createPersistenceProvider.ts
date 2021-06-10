import { RecordSet } from '@openland/spacex/lib/web/store/RecordStore';
import { PersistenceProvider } from '@openland/spacex-web';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';

export function createPersistenceProvider(store: KeyValueStore): PersistenceProvider {
    return {
        saveRecords: async (src: RecordSet) => {
            await store.writeKeys(Object.keys(src).map((k) => ({ key: k, value: JSON.stringify(src[k]) })));
        },
        loadRecords: async (keys) => {
            let read = await store.readKeys(Array.from(keys));
            let res: any = {};
            for (let r of read) {
                if (r.value) {
                    res[r.key] = JSON.parse(r.value);
                }
            }
            return res;
        }
    };
}