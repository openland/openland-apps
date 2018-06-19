import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { FolderItemsTileOverlayQuery } from 'openland-api/FolderItemsTileOverlayQuery';

export const FolderTileSource = graphQLTileSource(FolderItemsTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});