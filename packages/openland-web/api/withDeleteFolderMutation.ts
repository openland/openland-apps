import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { DeleteFolderMutation } from 'openland-api/DeleteFolderMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withDeleteFolderMutation = graphqlMutation(DeleteFolderMutation, 'deleteFolder', { refetchQueries: [FoldersQuery] });