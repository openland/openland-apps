import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatHistoryQuery } from 'openland-api/ChatHistoryQuery';
export const withChatHistory = graphqlRouted(ChatHistoryQuery);