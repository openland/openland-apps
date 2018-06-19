import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Folder } from 'openland-api';

export const withAlterFolderMutation = graphqlMutation(Folder.AlterFolderMutation, 'alterFolder', { refetchQueries: [Folder.FoldersQuery] });