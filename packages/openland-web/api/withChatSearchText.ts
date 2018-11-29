import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomSearchTextQuery } from 'openland-api';

export const withChatSearchText = graphqlRouted(RoomSearchTextQuery, {
    fetchPolicy: 'cache-and-network',
});
