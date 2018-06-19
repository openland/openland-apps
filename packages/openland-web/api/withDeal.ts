import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { DealQuery } from 'openland-api/DealQuery';

export const withDeal = graphqlRouted(DealQuery, { params: ['dealId'] });