import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AddToFolderMutation } from 'openland-api/AddToFolderMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withAddToFolderMutation = graphqlMutation(AddToFolderMutation, 'addToFolder', { refetchQueries: [FoldersQuery] });