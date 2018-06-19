import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ProspectingCapacityQuery } from 'openland-api/ProspectingCapacityQuery';

export const withSourcingCapacity = graphqlRouted(ProspectingCapacityQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });