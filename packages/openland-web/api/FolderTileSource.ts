import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { Folder } from 'openland-api';

export const FolderTileSource = graphQLTileSource(Folder.FolderItemsTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});