import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Folder } from 'openland-api';

export const withFolders = graphqlRouted(Folder.FoldersQuery);