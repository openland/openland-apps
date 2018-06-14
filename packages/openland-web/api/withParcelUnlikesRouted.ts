import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withParcelUnlikesRouted = graphqlMutation(Queries.Parcels.ParcelUnlikeMutation, 'doUnlike', {
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});