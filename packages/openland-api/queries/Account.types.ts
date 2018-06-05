import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Account from './Account';

export const AccountQuery = typedQuery<Types.AccountQuery, {}>(Account.AccountQuery);
export const ProfilePrefillQuery = typedQuery<Types.ProfilePrefillQuery, {}>(Account.ProfilePrefillQuery);

export const SaveProfileMutation = typedMutation<Types.SaveProfileMutation, Types.SaveProfileMutationVariables>(Account.SaveProfileMutation);
export const CreateOrganizationMutation = typedMutation<Types.CreateOrganizationMutation, Types.CreateOrganizationMutationVariables>(Account.CreateOrganizationMutation);