
import { OrganizationMembersQuery } from 'openland-api/OrganizationMembersQuery';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationInviteMemberMutation } from 'openland-api';

export const withOrganizationInviteMember = graphqlMutation(OrganizationInviteMemberMutation, 'sendInvite', { refetchQueries: [OrganizationMembersQuery] });