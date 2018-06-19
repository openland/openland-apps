import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateFolderMutation } from 'openland-api/CreateFolderMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withCreateFolderMutation = graphqlMutation(CreateFolderMutation, 'createFolder', { refetchQueries: [FoldersQuery] });