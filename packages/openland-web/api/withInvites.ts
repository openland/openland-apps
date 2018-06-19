import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountInvitesQuery } from 'openland-api/AccountInvitesQuery';

export const withInvites = graphqlRouted(AccountInvitesQuery);
