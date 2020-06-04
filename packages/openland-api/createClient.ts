import { OpenlandClient } from './spacex';
import { GraphqlEngine } from '@openland/spacex';
import { createEngineRetry } from './createEngineRetry';
import { createEnginePriority } from './createEnginePriority';

export function createClient(engine: GraphqlEngine) {
    return new OpenlandClient({ engine: createEngineRetry(createEnginePriority(engine)) });
}