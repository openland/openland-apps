
import { OrganizationMembersQuery } from 'openland-api/OrganizationMembersQuery';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationRemoveMemberMutation } from 'openland-api';

export const withOrganizationRemoveMember = graphqlMutation(OrganizationRemoveMemberMutation, 'remove', { refetchQueries: [OrganizationMembersQuery] });