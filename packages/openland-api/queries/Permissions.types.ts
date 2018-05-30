import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Permissions from './Permissions';

export const PermissionsQuery = typedQuery<Types.PermissionsQuery, {}>(Permissions.PermissionsQuery);

export const SuperAccountsQuery = typedQuery<Types.SuperAccountsQuery, {}>(Permissions.SuperAccountsQuery);
export const SuperAccountQuery = typedQuery<Types.SuperAccountQuery, Types.SuperAccountQueryVariables>(Permissions.SuperAccountQuery);

export const SuperAccountAddMutation = typedMutation<Types.SuperAccountAddMutation, Types.SuperAccountAddMutationVariables>(Permissions.SuperAccountAddMutation);
export const SuperAccountRenameMutation = typedMutation<Types.SuperAccountRenameMutation, Types.SuperAccountRenameMutationVariables>(Permissions.SuperAccountRenameMutation);
export const SuperAccountActivateMutation = typedMutation<Types.SuperAccountActivateMutation, Types.SuperAccountActivateMutationVariables>(Permissions.SuperAccountActivateMutation);
export const SuperAccountSuspendMutation = typedMutation<Types.SuperAccountSuspendMutation, Types.SuperAccountSuspendMutationVariables>(Permissions.SuperAccountSuspendMutation);

export const SuperAccountMemberAddMutation = typedMutation<Types.SuperAccountMemberAddMutation, Types.SuperAccountMemberAddMutationVariables>(Permissions.SuperAccountMemberAddMutation);
export const SuperAccountMemberRemoveMutation = typedMutation<Types.SuperAccountMemberRemoveMutation, Types.SuperAccountMemberRemoveMutationVariables>(Permissions.SuperAccountMemberRemoveMutation);

export const SuperAdminsQuery = typedQuery<Types.SuperAdminsQuery, {}>(Permissions.SuperAdminsQuery);
export const SuperAdminAddMutation = typedMutation<Types.SuperAdminAddMutation, Types.SuperAdminAddMutationVariables>(Permissions.SuperAdminAddMutation);
export const SuperAdminRemoveMutation = typedMutation<Types.SuperAdminRemoveMutation, Types.SuperAdminRemoveMutationVariables>(Permissions.SuperAdminRemoveMutation);