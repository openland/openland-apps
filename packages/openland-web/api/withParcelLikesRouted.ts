import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Parcels } from 'openland-api';

export const withParcelLikesRouted = graphqlMutation(Parcels.ParcelLikeMutation, 'doLike', {
    params: ['parcelId'],
    refetchQueries: [Parcels.ParcelsFavoritesQuery, Parcels.ParcelsFavoritesCountQuery]
});