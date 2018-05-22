import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Folder from './Folder';

export const FoldersQuery = typedQuery<Types.FoldersQuery, {}>(Folder.FoldersQuery);
export const FoldersSelectQuery = typedQuery<Types.FoldersSelectQuery, {}>(Folder.FoldersSelectQuery);
export const FolderQuery = typedQuery<Types.FolderQuery, Types.FolderQueryVariables>(Folder.FolderQuery);

export const CreateFolderMutation = typedMutation<Types.CreateFolderMutation, Types.CreateFolderMutationVariables>(Folder.CreateFolderMutation);
export const CreateFolderFromSearchMutation = typedMutation<Types.CreateFolderFromSearchMutation, Types.CreateFolderFromSearchMutationVariables>(Folder.CreateFolderFromSearchMutation);
export const DeleteFolderMutation = typedMutation<Types.DeleteFolderMutation, Types.DeleteFolderMutationVariables>(Folder.DeleteFolderMutation);
export const AlterFolderMutation = typedMutation<Types.AlterFolderMutation, Types.AlterFolderMutationVariables>(Folder.AlterFolderMutation);

export const SetParcelFolderMutation = typedMutation<Types.SetParcelFolderMutation, Types.SetParcelFolderMutationVariables>(Folder.SetParcelFolderMutation);
export const AddToFolderMutation = typedMutation<Types.AddToFolderMutation, Types.AddToFolderMutationVariables>(Folder.AddToFolderMutation);
export const AddToFolderFromSearchMutation = typedMutation<Types.AddToFolderFromSearchMutation, Types.AddToFolderFromSearchMutationVariables>(Folder.AddToFolderFromSearchMutation);