import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withParcels = graphqlRouted(Queries.Parcels.ParcelsConnectionQuery, { params: ['page', 'query'] });