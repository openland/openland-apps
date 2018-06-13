import gql from 'graphql-tag';
import { OrganizationFull } from '../fragments/OrganizationFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { OrganizationProfileFull } from '../fragments/OrganizationProfileFull';

export const MyOrganizationQuery = gql`
    query MyOrganization {
        myOrganization {
            ...OrganizationFull
        }
    }
    ${OrganizationFull}
`;

export const MyOrganizationProfileQuery = gql`
    query MyOrganizationProfile {
        myOrganizationProfile {
            ...OrganizationProfileFull
        }
    }
    ${OrganizationProfileFull}
`;

export const MyOrganizationsQuery = gql`
    query MyOrganizations {
        myOrganizations {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
`;

export const UpdateOrganizationMutation = gql`
    mutation UpdateOrganization($input: UpdateOrganizationProfileInput!) {
        updateOrganizationProfile(input: $input) {
            ...OrganizationProfileFull
        }
    }
    ${OrganizationProfileFull}
`;

export const OrganizationQuery = gql`
    query Organization($organizationId: ID!) {
        organization(id: $organizationId) {
            ...OrganizationFull
        }
    }
    ${OrganizationFull}
`;

export const FollowOrganizationMutation = gql`
    mutation FollowOrganization($organizationId: ID!, $follow: Boolean!) {
        followOrganization: alphaFollowOrganization(id: $organizationId, follow: $follow) {
            id
            alphaFollowed
        }
    }
`;