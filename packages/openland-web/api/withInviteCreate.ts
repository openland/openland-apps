import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AccountCreateInviteMutation } from 'openland-api/AccountCreateInviteMutation';
import { AccountInvitesQuery } from 'openland-api/AccountInvitesQuery';

export const withInviteCreate = graphqlMutation(AccountCreateInviteMutation, 'createInvite', { refetchQueries: [AccountInvitesQuery] });