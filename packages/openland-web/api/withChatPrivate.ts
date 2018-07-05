import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatPrivateQuery } from 'openland-api/ChatPrivateQuery';

export const withChatPrivate = graphqlRouted(ChatPrivateQuery);