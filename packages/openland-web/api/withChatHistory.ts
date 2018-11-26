import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomHistoryQuery } from 'openland-api';
export const withChatHistory = graphqlRouted(RoomHistoryQuery);