
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationInviteOrganizationMutation } from 'openland-api';

export const withOrganizationInviteOrganization = graphqlMutation(OrganizationInviteOrganizationMutation, 'sendInvite', {params: ['organizationId']});