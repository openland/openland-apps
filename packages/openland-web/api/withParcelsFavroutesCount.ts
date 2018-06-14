import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withParcelsFavroutesCount = graphqlRouted(Queries.Parcels.ParcelsFavoritesCountQuery);