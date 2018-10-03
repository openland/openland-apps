import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperOnlineUserStatsQuery } from 'openland-api/SuperOnlineUserStatsQuery';

export const withOnlineUsers = graphqlRouted(SuperOnlineUserStatsQuery, { pollInterval: 1000 });