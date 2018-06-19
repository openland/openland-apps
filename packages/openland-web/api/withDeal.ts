import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Deals } from 'openland-api';

export const withDeal = graphqlRouted(Deals.DealQuery, { params: ['dealId'] });