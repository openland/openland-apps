import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Parcels } from 'openland-api';

export const withParcelRaw = graphqlRouted(Parcels.ParcelQuery, { params: ['parcelId'] });