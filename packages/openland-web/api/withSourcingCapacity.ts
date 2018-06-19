import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withSourcingCapacity = graphqlRouted(Sourcing.ProspectingCapacityQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });