import { PriorityEngine } from './priority/PriorityEngine';
import { GraphqlEngine } from '@openland/spacex';

export function createEnginePriority(engine: GraphqlEngine) {
    return new PriorityEngine({ engine });
}