import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AccountDestroyInviteMutation } from 'openland-api';
import { AccountInvitesQuery } from 'openland-api';

export const withInviteDestroy = graphqlMutation(AccountDestroyInviteMutation, 'destroyInvite', {
    refetchQueries: [AccountInvitesQuery],
});
