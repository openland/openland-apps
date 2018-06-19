import { graphqlTask } from 'openland-x-graphql/graphqlTask';
import { SampleTaskMutation } from 'openland-api/Tasks';

export const withSampleTask = graphqlTask(SampleTaskMutation);