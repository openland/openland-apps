import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Account } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withInviteInfo = graphqlCompose2(
    graphqlRouted(Account.AccountInviteInfoQuery, { params: ['inviteKey'] }),
    graphqlMutation(Account.AccountInviteJoinMutation, 'doJoin', { params: ['inviteKey'] }));