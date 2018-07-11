import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountPendMutation } from 'openland-api/SuperAccountPendMutation';

export const withSuperAccountPend = graphqlMutation(SuperAccountPendMutation, 'pend', { params: ['accountId'] });