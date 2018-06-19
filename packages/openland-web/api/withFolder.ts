import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FolderQuery } from 'openland-api/FolderQuery';

export const withFolder = graphqlRouted(FolderQuery, { params: [], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });