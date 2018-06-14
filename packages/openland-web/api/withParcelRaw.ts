import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withParcelRaw = graphqlRouted(Queries.Parcels.ParcelQuery, { params: ['parcelId'] });