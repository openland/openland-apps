import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ParcelsFavoritesCountQuery } from 'openland-api/ParcelsFavoritesCountQuery';

export const withParcelsFavroutesCount = graphqlRouted(ParcelsFavoritesCountQuery);