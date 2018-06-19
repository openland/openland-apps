import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withSourcing = graphqlRouted(Sourcing.SourcingQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});