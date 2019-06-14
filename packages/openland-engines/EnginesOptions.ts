import { KeyValueStore } from 'openland-y-utils/KeyValueStore';

export interface EngineOptions {
    conversationBatchSize: number;
    store: KeyValueStore;
    mocked?: boolean;
}
