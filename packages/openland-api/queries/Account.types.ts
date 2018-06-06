import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Account from './Account';

export const AccountQuery = typedQuery<Types.AccountQuery, {}>(Account.AccountQuery);
export const ProfilePrefillQuery = typedQuery<Types.ProfilePrefillQuery, {}>(Account.ProfilePrefillQuery);

export const SaveProfileMutation = typedMutation<Types.SaveProfileMutation, Types.SaveProfileMutationVariables>(Account.SaveProfileMutation);
export const CreateOrganizationMutation = typedMutation<Types.CreateOrganizationMutation, Types.CreateOrganizationMutationVariables>(Account.CreateOrganizationMutation);

export const AccountInvitesQuery = typedQuery<Types.AccountInvitesQuery, {}>(Account.AccountInvitesQuery);
export const AccountCreateInviteMutation = typedMutation<Types.AccountCreateInviteMutation, {}>(Account.AccountCreateInviteMutation);
export const AccountDestroyInviteMutation = typedMutation<Types.AccountDestroyInviteMutation, Types.AccountDestroyInviteMutationVariables>(Account.AccountDestroyInviteMutation);
export const AccountInviteInfoQuery = typedQuery<Types.AccountInviteInfoQuery, Types.AccountInviteInfoQueryVariables>(Account.AccountInviteInfoQuery);