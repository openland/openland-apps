import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FolderItemsConnectionQuery } from 'openland-api/FolderItemsConnectionQuery';

export const withFolderItems = graphqlRouted(FolderItemsConnectionQuery, { params: ['folderId', 'page', 'cursor'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });