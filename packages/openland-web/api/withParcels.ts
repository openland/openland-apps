import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Parcels } from 'openland-api';

export const withParcels = graphqlRouted(Parcels.ParcelsConnectionQuery, { params: ['page', 'query'] });