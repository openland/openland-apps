import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withSuperAdminRemove = graphqlMutation(Queries.Permissions.SuperAdminRemoveMutation, 'remove', { refetchQueries: [Queries.Permissions.SuperAdminsQuery] });