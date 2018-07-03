import gql from 'graphql-tag';
import { OrganizationFull } from '../fragments/OrganizationFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { OrganizationProfileFull } from '../fragments/OrganizationProfileFull';
import { UserShort } from '../fragments/UserShort';

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

export const CreateListingMutation = gql`
    mutation CreateListing($type: String!, $input: AlphaOrganizationListingInput!) {
        createListing: alphaOrganizationCreateListing(type: $type, input: $input) {
            name
            id
            name
            summary
            specialAttributes
            status
            updatedAt

            location{
                lat
                lon
            }
            locationTitle
            availability
            area
            price
            dealType
            shapeAndForm
            currentUse
            goodFitFor
            additionalLinks{
                text
                url
            }

            shortDescription
            areaRange{
                from
                to
            }
            geographies
            landUse
            unitCapacity
        }
    }
`;

export const EditListingMutation = gql`
    mutation EditListing($id: ID!, $input: AlphaOrganizationListingInput!) {
        editListing: alphaOrganizationEditListing(id: $id, input: $input) {
            name
            id
            name
            summary
            specialAttributes
            status
            updatedAt

            location{
                lat
                lon
            }
            locationTitle
            availability
            area
            price
            dealType
            shapeAndForm
            currentUse
            goodFitFor
            additionalLinks{
                text
                url
            }

            shortDescription
            areaRange{
                from
                to
            }
            geographies
            landUse
            unitCapacity
        }
    }
`;

export const DeleteListingMutation = gql`
    mutation DeleteListing($id: ID!) {
        alphaOrganizationDeleteListing(id: $id)
    }
`;

export const OrganizationMembersQuery = gql`
    query OrganizationMembers($orgId: ID!) {
        alphaOrganizationMembers(orgId: $orgId) {
            user{
                ...UserShort
            }
            role
        }
    }
    ${UserShort}
`;

export const OrganizationChangeMemberRoleMutation = gql`
    mutation OrganizationChangeMemberRole($memberId: ID!, $newRole: OrganizationMemberRole!) {
        alphaOrganizationChangeMemberRole(memberId: $memberId, newRole: $newRole)
    }
`;

export const OrganizationRemoveMemberMutation = gql`
    mutation OrganizationRemoveMember($memberId: ID!) {
        alphaOrganizationRemoveMember(memberId: $memberId)
    }
`;