import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withParcelUnlikes = graphqlMutation(Queries.Parcels.ParcelUnlikeMutation, 'doUnlike', {
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});