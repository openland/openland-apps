import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountRenameMutation } from 'openland-api';

export const withSuperAccountRename = graphqlMutation(SuperAccountRenameMutation, 'rename', {
    params: ['accountId'],
});
