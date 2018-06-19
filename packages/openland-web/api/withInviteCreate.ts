import { Account } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withInviteCreate = graphqlMutation(Account.AccountCreateInviteMutation, 'createInvite', { refetchQueries: [Account.AccountInvitesQuery] });