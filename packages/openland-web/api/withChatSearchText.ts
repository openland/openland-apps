import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatSearchTextQuery } from 'openland-api';

export const withChatSearchText = graphqlRouted(ChatSearchTextQuery, { fetchPolicy: 'cache-and-network' });