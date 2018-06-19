import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Permissions } from 'openland-api';

export const withSuperAccountSuspend = graphqlMutation(Permissions.SuperAccountSuspendMutation, 'suspend', { params: ['accountId'] });