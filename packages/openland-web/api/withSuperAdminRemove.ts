import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Permissions } from 'openland-api';

export const withSuperAdminRemove = graphqlMutation(Permissions.SuperAdminRemoveMutation, 'remove', { refetchQueries: [Permissions.SuperAdminsQuery] });