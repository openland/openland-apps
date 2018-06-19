import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withFolders = graphqlRouted(FoldersQuery);