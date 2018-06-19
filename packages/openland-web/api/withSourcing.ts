import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SourcingQuery } from 'openland-api/SourcingQuery';

export const withSourcing = graphqlRouted(SourcingQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});