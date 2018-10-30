
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountGlobalInviteQuery, AccountGlobalInviteInfoQuery } from 'openland-api';

export const withGlobalnvite = graphqlRouted(AccountGlobalInviteQuery);
export const withGlobalnviteInfo = graphqlRouted(AccountGlobalInviteInfoQuery);
