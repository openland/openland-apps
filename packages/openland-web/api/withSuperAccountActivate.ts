import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountActivateMutation } from 'openland-api';

export const withSuperAccountActivate = graphqlMutation(SuperAccountActivateMutation, 'activate', {
    params: ['accountId'],
});
