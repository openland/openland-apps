import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Parcels } from 'openland-api';

export const withParcelUnlikesRouted = graphqlMutation(Parcels.ParcelUnlikeMutation, 'doUnlike', {
    params: ['parcelId'],
    refetchQueries: [Parcels.ParcelsFavoritesQuery, Parcels.ParcelsFavoritesCountQuery]
});