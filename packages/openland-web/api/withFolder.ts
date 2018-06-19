import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Folder } from 'openland-api';

export const withFolder = graphqlRouted(Folder.FolderQuery, { params: [], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });