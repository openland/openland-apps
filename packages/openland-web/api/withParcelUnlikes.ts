import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ParcelUnlikeMutation } from 'openland-api/ParcelUnlikeMutation';
import { ParcelsFavoritesQuery } from 'openland-api/ParcelsFavoritesQuery';
import { ParcelsFavoritesCountQuery } from 'openland-api/ParcelsFavoritesCountQuery';

export const withParcelUnlikes = graphqlMutation(ParcelUnlikeMutation, 'doUnlike', {
    refetchQueries: [ParcelsFavoritesQuery, ParcelsFavoritesCountQuery]
});