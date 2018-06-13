import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as OrganizationProfile from './Organization';

export const OrganizationQuery = typedQuery<Types.OrganizationQuery, Types.OrganizationQueryVariables>(OrganizationProfile.OrganizationQuery);
export const MyOrganizationQuery = typedQuery<Types.MyOrganizationQuery, {}>(OrganizationProfile.MyOrganizationQuery);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizationsQuery, {}>(OrganizationProfile.MyOrganizationsQuery);
export const FollowOrganizationMutation = typedMutation<Types.FollowOrganizationMutation, Types.FollowOrganizationMutationVariables>(OrganizationProfile.FollowOrganizationMutation);

export const MyOrganizationProfileQuery = typedQuery<Types.MyOrganizationProfileQuery, {}>(OrganizationProfile.MyOrganizationProfileQuery);
export const UpdateOrganizationMutation = typedMutation<Types.UpdateOrganizationMutation, Types.UpdateOrganizationMutationVariables>(OrganizationProfile.UpdateOrganizationMutation);