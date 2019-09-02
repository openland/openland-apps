import { KeyValueStore } from 'openland-y-utils/KeyValueStore';

export interface EngineOptions {
    conversationBatchSize: number;
    feedBatchSize: number;
    store: KeyValueStore;
}
