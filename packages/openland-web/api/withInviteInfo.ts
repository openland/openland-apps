import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AccountInviteInfoQuery } from 'openland-api/AccountInviteInfoQuery';
import { AccountInviteJoinMutation } from 'openland-api/AccountInviteJoinMutation';

export const withInviteInfo = graphqlCompose2(
    graphqlRouted(AccountInviteInfoQuery, { params: ['inviteKey'] }),
    graphqlMutation(AccountInviteJoinMutation, 'doJoin', { params: ['inviteKey'] }));