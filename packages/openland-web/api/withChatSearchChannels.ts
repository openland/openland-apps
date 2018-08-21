import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatSearchChannelQuery } from 'openland-api';

export const withChatSearchChannels = graphqlRouted(ChatSearchChannelQuery, { fetchPolicy: 'cache-and-network' });