import { typedTask } from 'openland-y-graphql/typed';
import { typedQuery } from 'openland-y-graphql/typed';
import * as Raw from './queries/Tasks';
import * as Types from './Types';

export const RefreshTaskQuery = typedQuery<Types.RefreshTask, Types.RefreshTaskVariables>(Raw.RefreshTaskQuery);
export const SampleTaskMutation = typedTask<Types.SampleTask, Types.SampleTaskVariables, { multiplied: number }>(Raw.SampleTaskMutation);
export const FolderExportTaskMutation = typedTask<Types.FolderExportTask, Types.FolderExportTaskVariables, { downloadLink: string }>(Raw.FolderExportTaskMutation);