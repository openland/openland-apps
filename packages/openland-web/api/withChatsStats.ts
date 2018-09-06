import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperChatsStatsQuery } from 'openland-api';
export const withChatsStats = graphqlRouted(SuperChatsStatsQuery);