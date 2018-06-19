import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Account } from 'openland-api';

export const withInviteDestroy = graphqlMutation(Account.AccountDestroyInviteMutation, 'destroyInvite', { refetchQueries: [Account.AccountInvitesQuery] });