import { graphqlTask } from 'openland-x-graphql/graphqlTask';
import { FolderExportTaskMutation } from 'openland-api/Tasks';

export const withFolderExportTask = graphqlTask(FolderExportTaskMutation);