import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAdminAddMutation } from 'openland-api';
import { SuperAdminsQuery } from 'openland-api';

export const withSuperAdminAdd = graphqlMutation(SuperAdminAddMutation, 'add', {
    refetchQueries: [SuperAdminsQuery],
});
