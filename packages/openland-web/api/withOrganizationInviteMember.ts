import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationInviteMembersMutation } from 'openland-api';

export const withOrganizationInviteMembers = graphqlMutation(OrganizationInviteMembersMutation, 'sendInvite');