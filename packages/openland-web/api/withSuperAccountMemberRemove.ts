import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountMemberRemoveMutation } from 'openland-api/SuperAccountMemberRemoveMutation';

export const withSuperAccountMemberRemove =
    graphqlMutation(SuperAccountMemberRemoveMutation, 'remove', { params: ['accountId'] });