import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountAddMutation } from 'openland-api/SuperAccountAddMutation';
import { SuperAccountsQuery } from 'openland-api/SuperAccountsQuery';

export const withSuperAccountAdd =
    graphqlMutation(SuperAccountAddMutation, 'add', { refetchQueries: [SuperAccountsQuery] });