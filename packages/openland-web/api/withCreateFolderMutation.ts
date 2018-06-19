import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withCreateFolderMutation = graphqlMutation(Folder.CreateFolderMutation, 'createFolder', { refetchQueries: [Folder.FoldersQuery] });