import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperChatsStatsQuery, SuperMessagesSentStatsQuery } from 'openland-api';
export const withChatsStats = graphqlRouted(SuperChatsStatsQuery);
export const withMessagesStats = graphqlRouted(SuperMessagesSentStatsQuery);