import { graphqlTask } from 'openland-x-graphql/graphqlTask';
import { Tasks } from 'openland-api';

export const withFolderExportTask = graphqlTask(Tasks.FolderExportTaskMutation);