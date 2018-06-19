import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ParcelLikeMutation } from 'openland-api/ParcelLikeMutation';
import { ParcelsFavoritesQuery } from 'openland-api/ParcelsFavoritesQuery';
import { ParcelsFavoritesCountQuery } from 'openland-api/ParcelsFavoritesCountQuery';

export const withParcelLikes = graphqlMutation(ParcelLikeMutation, 'doLike', {
    refetchQueries: [ParcelsFavoritesQuery, ParcelsFavoritesCountQuery]
});