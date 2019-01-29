import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountMemberAddMutation } from 'openland-api';

export const withSuperAccountMemberAdd = graphqlMutation(SuperAccountMemberAddMutation, 'add', {
    params: ['accountId'],
});
