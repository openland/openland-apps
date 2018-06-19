import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Folder } from 'openland-api';

export const withFolderItems = graphqlRouted(Folder.FolderItemsConnectionQuery, { params: ['folderId', 'page', 'cursor'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });