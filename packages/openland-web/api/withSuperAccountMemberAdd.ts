import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Permissions } from 'openland-api';

export const withSuperAccountMemberAdd =
    graphqlMutation(Permissions.SuperAccountMemberAddMutation, 'add', { params: ['accountId'] });