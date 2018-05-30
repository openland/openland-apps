import { typedQuery, typedTask } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Tasks from './Tasks';

export const RefreshTaskQuery = typedQuery<Types.RefreshTaskQuery, Types.RefreshTaskQueryVariables>(Tasks.RefreshTaskQuery);
export const SampleTask = typedTask<Types.SampleTaskMutation, Types.SampleTaskMutationVariables, { multiplied: number }>(Tasks.SampleTaskMutation);