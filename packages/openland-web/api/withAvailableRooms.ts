import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AvailableRoomsQuery } from 'openland-api/AvailableRoomsQuery';

export const withAvailableRooms = graphqlRouted(AvailableRoomsQuery);
