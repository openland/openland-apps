import { Sourcing } from 'openland-api';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';

export const withNextOpportunity = graphqlRouted(Sourcing.NextOpportunityQuery, { params: ['initialId', 'sort'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });