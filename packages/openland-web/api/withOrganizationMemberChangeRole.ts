
import { OrganizationMembersQuery } from 'openland-api/OrganizationMembersQuery';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationChangeMemberRoleMutation } from 'openland-api';

export const withOrganizationMemberChangeRole = graphqlMutation(OrganizationChangeMemberRoleMutation, 'changeRole', { refetchQueries: [OrganizationMembersQuery] });