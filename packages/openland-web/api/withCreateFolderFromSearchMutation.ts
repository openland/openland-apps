import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateFolderFromSearchMutation } from 'openland-api/CreateFolderFromSearchMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withCreateFolderFromSearchMutation = graphqlMutation(CreateFolderFromSearchMutation, 'createFolderFromSearch', { refetchQueries: [FoldersQuery] });