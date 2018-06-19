import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ParcelsFavoritesQuery } from 'openland-api/ParcelsFavoritesQuery';

export const withParcelsFavorites = graphqlRouted(ParcelsFavoritesQuery);