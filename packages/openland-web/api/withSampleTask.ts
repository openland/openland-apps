import { graphqlTask } from 'openland-x-graphql/graphqlTask';
import { Tasks } from 'openland-api';

export const withSampleTask = graphqlTask(Tasks.SampleTaskMutation);