import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Parcels } from 'openland-api';

export const withParcelUnlikes = graphqlMutation(Parcels.ParcelUnlikeMutation, 'doUnlike', {
    refetchQueries: [Parcels.ParcelsFavoritesQuery, Parcels.ParcelsFavoritesCountQuery]
});