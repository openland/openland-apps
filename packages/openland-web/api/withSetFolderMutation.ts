import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SetParcelFolderMutation } from 'openland-api/SetParcelFolderMutation';
import { FoldersQuery } from 'openland-api/FoldersQuery';

export const withSetFolderMutation = graphqlMutation(SetParcelFolderMutation, 'setFolder', { refetchQueries: [FoldersQuery] });