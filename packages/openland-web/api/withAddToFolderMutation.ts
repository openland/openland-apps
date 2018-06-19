import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withAddToFolderMutation = graphqlMutation(Folder.AddToFolderMutation, 'addToFolder', { refetchQueries: [Folder.FoldersQuery] });