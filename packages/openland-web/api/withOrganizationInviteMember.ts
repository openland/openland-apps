
import { OrganizationMembersQuery } from 'openland-api/OrganizationMembersQuery';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationInviteMembersMutation } from 'openland-api';

export const withOrganizationInviteMembers = graphqlMutation(OrganizationInviteMembersMutation, 'sendInvite', { refetchQueries: [OrganizationMembersQuery], params: ['organizationId'] });