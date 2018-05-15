import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Folder from './Folder';

export const FoldersQuery = typedQuery<Types.FoldersQuery, {}>(Folder.FoldersQuery);
export const FolderQuery = typedQuery<Types.FolderQuery, Types.FolderQueryVariables>(Folder.FolderQuery);
export const CreateFolderMutation = typedMutation<Types.CreateFolderMutation, Types.CreateFolderMutationVariables>(Folder.CreateFolderMutation);