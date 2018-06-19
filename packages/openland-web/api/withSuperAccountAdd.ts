import { Permissions } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withSuperAccountAdd =
    graphqlMutation(Permissions.SuperAccountAddMutation, 'add', { refetchQueries: [Permissions.SuperAccountsQuery] });