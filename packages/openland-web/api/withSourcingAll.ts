import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withSourcingAll = graphqlRouted(Sourcing.SourcingAllQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });