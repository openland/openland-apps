import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
export const withChat = graphqlRouted(ChatInfoQuery);