import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withDeleteFolderMutation = graphqlMutation(Folder.DeleteFolderMutation, 'deleteFolder', { refetchQueries: [Folder.FoldersQuery] });