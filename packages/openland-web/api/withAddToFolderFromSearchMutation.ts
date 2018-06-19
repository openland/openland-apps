import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withAddToFolderFromSearchMutation = graphqlMutation(Folder.AddToFolderFromSearchMutation, 'addToFolderFromSearch', { refetchQueries: [Folder.FoldersQuery] });