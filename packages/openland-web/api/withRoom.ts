import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomQuery } from 'openland-api';
export const withRoom = graphqlRouted(RoomQuery);