import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withCreateFolderFromSearchMutation = graphqlMutation(Folder.CreateFolderFromSearchMutation, 'createFolderFromSearch', { refetchQueries: [Folder.FoldersQuery] });