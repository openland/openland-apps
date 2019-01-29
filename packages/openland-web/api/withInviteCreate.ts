import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AccountCreateInviteMutation } from 'openland-api';
import { AccountInvitesQuery } from 'openland-api';

export const withInviteCreate = graphqlMutation(AccountCreateInviteMutation, 'createInvite', {
    refetchQueries: [AccountInvitesQuery],
});
