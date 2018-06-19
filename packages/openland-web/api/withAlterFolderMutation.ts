import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AlterFolderMutation } from 'openland-api/AlterFolderMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withAlterFolderMutation = graphqlMutation(AlterFolderMutation, 'alterFolder', { refetchQueries: [FoldersQuery] });