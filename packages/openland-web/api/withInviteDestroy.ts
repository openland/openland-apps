import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AccountDestroyInviteMutation } from 'openland-api/AccountDestroyInviteMutation';
import { AccountInvitesQuery } from 'openland-api/AccountInvitesQuery';

export const withInviteDestroy = graphqlMutation(AccountDestroyInviteMutation, 'destroyInvite', { refetchQueries: [AccountInvitesQuery] });