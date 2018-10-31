
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountAppInviteQuery, AccountAppInviteInfoQuery } from 'openland-api';

export const withAppInvite = graphqlRouted(AccountAppInviteQuery);
export const withAppInviteInfo = graphqlRouted(AccountAppInviteInfoQuery);
