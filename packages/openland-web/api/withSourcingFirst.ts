import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withSourcingFirst = graphqlRouted(Sourcing.SourcingFirstQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});