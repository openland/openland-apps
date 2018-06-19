import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAdminAddMutation } from 'openland-api/SuperAdminAddMutation';
import { SuperAdminsQuery } from 'openland-api/SuperAdminsQuery';

export const withSuperAdminAdd = graphqlMutation(SuperAdminAddMutation, 'add', { refetchQueries: [SuperAdminsQuery] });