import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationChangeMemberRoleMutation, OrganizationQuery } from 'openland-api';

export const withOrganizationMemberChangeRole = graphqlMutation(
    OrganizationChangeMemberRoleMutation,
    'changeRole',
    { refetchQueries: [OrganizationQuery] },
);
