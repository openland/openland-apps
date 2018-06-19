import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SourcingFirstQuery } from 'openland-api/SourcingFirstQuery';

export const withSourcingFirst = graphqlRouted(SourcingFirstQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});