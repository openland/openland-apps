import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AvailableRoomsQuery } from 'openland-api';

export const withAvailableRooms = graphqlRouted(AvailableRoomsQuery);
