import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withParcelDirect2 = graphqlRouted(Queries.Parcels.ParcelQuery);