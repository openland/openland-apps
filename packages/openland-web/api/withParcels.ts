import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ParcelsConnectionQuery } from 'openland-api/ParcelsConnectionQuery';

export const withParcels = graphqlRouted(ParcelsConnectionQuery, { params: ['page', 'query'] });