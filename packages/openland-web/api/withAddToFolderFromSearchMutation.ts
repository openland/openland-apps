import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AddToFolderFromSearchMutation } from 'openland-api/AddToFolderFromSearchMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withAddToFolderFromSearchMutation = graphqlMutation(AddToFolderFromSearchMutation, 'addToFolderFromSearch', { refetchQueries: [FoldersQuery] });