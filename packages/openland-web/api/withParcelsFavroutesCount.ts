import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Parcels } from 'openland-api';

export const withParcelsFavroutesCount = graphqlRouted(Parcels.ParcelsFavoritesCountQuery);