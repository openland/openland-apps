import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountMemberRemoveMutation } from 'openland-api';

export const withSuperAccountMemberRemove = graphqlMutation(
    SuperAccountMemberRemoveMutation,
    'remove',
    { params: ['accountId'] },
);
