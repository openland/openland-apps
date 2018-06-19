import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SourcingAllQuery } from 'openland-api/SourcingAllQuery';

export const withSourcingAll = graphqlRouted(SourcingAllQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });