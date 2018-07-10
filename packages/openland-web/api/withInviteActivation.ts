import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AccountInviteJoinMutation } from 'openland-api/AccountInviteJoinMutation';

export const withInviteActivation = graphqlMutation(AccountInviteJoinMutation, 'activate', { params: ['inviteKey'] });
