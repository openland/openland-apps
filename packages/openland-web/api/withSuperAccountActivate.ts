import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Permissions } from 'openland-api';

export const withSuperAccountActivate =
    graphqlMutation(Permissions.SuperAccountActivateMutation, 'activate', { params: ['accountId'] });
