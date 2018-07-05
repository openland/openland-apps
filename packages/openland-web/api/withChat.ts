import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatQuery } from 'openland-api/ChatQuery';
export const withChat = graphqlRouted(ChatQuery);