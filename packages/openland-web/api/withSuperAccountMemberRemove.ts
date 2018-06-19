import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Permissions } from 'openland-api';

export const withSuperAccountMemberRemove =
    graphqlMutation(Permissions.SuperAccountMemberRemoveMutation, 'remove', { params: ['accountId'] });