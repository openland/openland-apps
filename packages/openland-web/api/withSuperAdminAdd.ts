import { Permissions } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withSuperAdminAdd = graphqlMutation(Permissions.SuperAdminAddMutation, 'add', { refetchQueries: [Permissions.SuperAdminsQuery] });