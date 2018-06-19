import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Account } from 'openland-api';

export const withInvites = graphqlRouted(Account.AccountInvitesQuery);
