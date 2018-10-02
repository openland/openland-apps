import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatSearchForComposeQuery } from 'openland-api/ChatSearchForComposeQuery';

export const withChatCompose = graphqlRouted(ChatSearchForComposeQuery, { params: ['query'], fetchPolicy: 'network-only' });