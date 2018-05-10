import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Parcels from './Parcels';

export const ParcelQuery = typedQuery<Types.ParcelQuery, Types.ParcelQueryVariables>(Parcels.ParcelQuery);
export const ParcelsConnectionQuery = typedQuery<Types.ParcelsConnectionQuery, Types.ParcelsConnectionQueryVariables>(Parcels.ParcelsConnectionQuery);
export const ParcelsFavoritesQuery = typedQuery<Types.ParcelsFavoritesQuery, {}>(Parcels.ParcelsFavoritesQuery);
export const ParcelsFavoritesCountQuery = typedQuery<Types.ParcelsFavoritesCountQuery, {}>(Parcels.ParcelsFavoritesCountQuery);
export const ParcelsTileOverlayQuery = typedQuery<Types.ParcelsTileOverlayQuery, Types.ParcelsTileOverlayQueryVariables>(Parcels.ParcelsTileOverlayQuery);
export const ParcelsPointOverlayQuery = typedQuery<Types.ParcelsPointOverlayQuery, Types.ParcelsPointOverlayQueryVariables>(Parcels.ParcelsPointOverlayQuery);

export const ParcelLikeMutation = typedMutation<Types.ParcelLikeMutation, Types.ParcelLikeMutationVariables>(Parcels.ParcelLikeMutation);
export const ParcelUnlikeMutation = typedMutation<Types.ParcelUnlikeMutation, Types.ParcelUnlikeMutationVariables>(Parcels.ParcelUnlikeMutation);
export const ParcelAlterMutation = typedMutation<Types.ParcelAlterMutation, Types.ParcelAlterMutationVariables>(Parcels.ParcelAlterMutation);

export const ParcelsStatsQuery = typedQuery<Types.ParcelsStatsQuery, Types.ParcelsStatsQueryVariables>(Parcels.ParcelsStatsQuery);
export const ParcelsSearchQuery = typedQuery<Types.ParcelsSearchQuery, Types.ParcelsSearchQueryVariables>(Parcels.ParcelsSearchQuery);

export const ParcelNotesMutation = typedMutation<Types.ParcelNotesMutation, Types.ParcelNotesMutationVariables>(Parcels.ParcelNotesMutation);

export const BlockQuery = typedQuery<Types.BlockQuery, Types.BlockQueryVariables>(Parcels.BlockQuery);
export const BlocksConnectionQuery = typedQuery<Types.BlocksConnectionQuery, Types.BlocksConnectionQueryVariables>(Parcels.BlocksConnectionQuery);
export const BlocksTileOverlayQuery = typedQuery<Types.BlocksTileOverlayQuery, Types.BlocksTileOverlayQueryVariables>(Parcels.BlocksTileOverlayQuery);