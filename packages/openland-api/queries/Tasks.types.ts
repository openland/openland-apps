import { typedTask } from 'openland-x-graphql/typed';
import { typedQuery } from 'openland-x-graphql/typed';
import * as Raw from './Tasks';
import * as Types from '../Types';

export const RefreshTaskQuery = typedQuery<Types.RefreshTaskQuery, Types.RefreshTaskQueryVariables>(Raw.RefreshTaskQuery);
export const SampleTaskMutation = typedTask<Types.SampleTaskMutation, Types.SampleTaskMutationVariables, { multiplied: number }>(Raw.SampleTaskMutation);
export const FolderExportTaskMutation = typedTask<Types.FolderExportTaskMutation, Types.FolderExportTaskMutationVariables, { downloadLink: string }>(Raw.FolderExportTaskMutation);