import { OpenlandClient } from './spacex';
import { GraphqlEngine } from '@openland/spacex';
import { createEngineRetry } from './createEngineRetry';

export function createClient(engine: GraphqlEngine) {
    return new OpenlandClient(createEngineRetry(engine));
}