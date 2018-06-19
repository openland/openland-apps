import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Permissions } from 'openland-api';

export const withSuperAccountRename =
    graphqlMutation(Permissions.SuperAccountRenameMutation, 'rename', { params: ['accountId'] });