import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as OrganizationProfile from './Organization';

export const OrganizationQuery = typedQuery<Types.OrganizationQuery, Types.OrganizationQueryVariables>(OrganizationProfile.OrganizationQuery);
export const MyOrganizationQuery = typedQuery<Types.MyOrganizationQuery, {}>(OrganizationProfile.MyOrganizationQuery);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizationsQuery, {}>(OrganizationProfile.MyOrganizationsQuery);
export const FollowOrganizationMutation = typedMutation<Types.FollowOrganizationMutation, Types.FollowOrganizationMutationVariables>(OrganizationProfile.FollowOrganizationMutation);

export const CurrentOrganizationProfileQuery = typedQuery<Types.CurrentOrganizationProfileQuery, {}>(OrganizationProfile.CurrentOrganizationProfileQuery);
export const OrganizationProfileQuery = typedQuery<Types.OrganizationProfileQuery, Types.OrganizationProfileQueryVariables>(OrganizationProfile.OrganizationProfileQuery);
export const EditOrganizationProfilMutation = typedMutation<Types.EditOrganizationProfileMutation, Types.EditOrganizationProfileMutationVariables>(OrganizationProfile.EditOrganizationProfileMutation);