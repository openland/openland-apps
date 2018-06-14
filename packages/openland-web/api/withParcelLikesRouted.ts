import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withParcelLikesRouted = graphqlMutation(Queries.Parcels.ParcelLikeMutation, 'doLike', {
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});