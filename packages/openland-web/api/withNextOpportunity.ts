import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { NextOpportunityQuery } from 'openland-api/NextOpportunityQuery';

export const withNextOpportunity = graphqlRouted(NextOpportunityQuery, { params: ['initialId', 'sort'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });