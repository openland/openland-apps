import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAdminRemoveMutation } from 'openland-api/SuperAdminRemoveMutation';
import { SuperAdminsQuery } from 'openland-api/SuperAdminsQuery';

export const withSuperAdminRemove = graphqlMutation(SuperAdminRemoveMutation, 'remove', { refetchQueries: [SuperAdminsQuery] });