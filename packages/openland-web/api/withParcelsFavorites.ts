import { Queries } from 'openland-api';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';

export const withParcelsFavorites = graphqlRouted(Queries.Parcels.ParcelsFavoritesQuery);