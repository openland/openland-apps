import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountSuspendMutation } from 'openland-api/SuperAccountSuspendMutation';

export const withSuperAccountSuspend = graphqlMutation(SuperAccountSuspendMutation, 'suspend', { params: ['accountId'] });