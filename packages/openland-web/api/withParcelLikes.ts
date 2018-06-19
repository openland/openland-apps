import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Parcels } from 'openland-api';

export const withParcelLikes = graphqlMutation(Parcels.ParcelLikeMutation, 'doLike', {
    refetchQueries: [Parcels.ParcelsFavoritesQuery, Parcels.ParcelsFavoritesCountQuery]
});