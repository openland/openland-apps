import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ParcelQuery } from 'openland-api/ParcelQuery';

export const withParcelRaw = graphqlRouted(ParcelQuery, { params: ['parcelId'] });