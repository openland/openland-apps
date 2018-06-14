import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withParcelLikes = graphqlMutation(Queries.Parcels.ParcelLikeMutation, 'doLike', {
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});