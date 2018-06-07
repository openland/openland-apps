import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as OrganizationProfile from './OrganizationProfile';

export const CurrentOrganizationProfileQuery = typedQuery<Types.CurrentOrganizationProfileQuery, {}>(OrganizationProfile.CurrentOrganizationProfileQuery);
export const EditOrganizationProfilMutation = typedMutation<Types.EditOrganizationProfileMutation, Types.EditOrganizationProfileMutationVariables>(OrganizationProfile.EditOrganizationProfileMutation);