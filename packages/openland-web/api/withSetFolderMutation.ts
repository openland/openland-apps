import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withSetFolderMutation = graphqlMutation(Folder.SetParcelFolderMutation, 'setFolder', { refetchQueries: [Folder.FoldersQuery] });