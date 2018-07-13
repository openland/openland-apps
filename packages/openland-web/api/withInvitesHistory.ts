import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountInvitesHistoryQuery } from 'openland-api';

export const withInvitesHistory = graphqlRouted(AccountInvitesHistoryQuery);
