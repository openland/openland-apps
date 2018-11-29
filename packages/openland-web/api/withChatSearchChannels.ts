import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomSearchQuery } from 'openland-api';

export const withChatSearchChannels = graphqlRouted(RoomSearchQuery, {
    fetchPolicy: 'cache-and-network',
});
