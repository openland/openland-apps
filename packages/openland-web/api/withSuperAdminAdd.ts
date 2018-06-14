import { Queries } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withSuperAdminAdd = graphqlMutation(Queries.Permissions.SuperAdminAddMutation, 'add', { refetchQueries: [Queries.Permissions.SuperAdminsQuery] });