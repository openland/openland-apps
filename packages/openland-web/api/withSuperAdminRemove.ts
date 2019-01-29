import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAdminRemoveMutation } from 'openland-api';
import { SuperAdminsQuery } from 'openland-api';

export const withSuperAdminRemove = graphqlMutation(SuperAdminRemoveMutation, 'remove', {
    refetchQueries: [SuperAdminsQuery],
});
