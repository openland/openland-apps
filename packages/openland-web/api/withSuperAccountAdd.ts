import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountAddMutation } from 'openland-api';
import { SuperAccountsQuery } from 'openland-api';

export const withSuperAccountAdd = graphqlMutation(SuperAccountAddMutation, 'add', {
    refetchQueries: [SuperAccountsQuery],
});
