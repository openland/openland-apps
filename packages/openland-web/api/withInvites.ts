import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountInvitesQuery } from 'openland-api';

export const withInvites = graphqlRouted(AccountInvitesQuery);
