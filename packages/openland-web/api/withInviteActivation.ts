import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationActivateByInviteMutation } from 'openland-api';

export const withInviteActivation = graphqlMutation(OrganizationActivateByInviteMutation, 'activate', { params: ['inviteKey'] });
