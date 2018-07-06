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

export const ExploreOrganizationsQuery = gql`
    query ExploreOrganizations($query: String, $page: Int) {
        items: alphaOrganizations(query: $query, page: $page, first: 50) {
            edges {
                node {
                    ...OrganizationShort
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                currentPage
                pagesCount
                openEnded
            }
        }
    }
    ${OrganizationShort}
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
            ... on  OrganizationJoinedMember{
                user {
                    ...UserShort
                }
                joinedAt
            }
            ... on  OrganizationIvitedMember{
                firstName
                lastName
                inviteId
            }
            email
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

export const OrganizationInviteMembersMutation = gql`
    mutation OrganizationInviteMembers($inviteRequests: [InviteRequest!]!) {
        alphaOrganizationInviteMembers(inviteRequests: $inviteRequests)
    }
`;

export const OrganizationPublicInviteQuery = gql`
    query OrganizationPublicInvite{
        publicInvite: alphaOrganizationPublicInvite{
            id
            key
            ttl
        }
    }
`;

export const OrganizationCreatePublicInviteMutation = gql`
    mutation OrganizationCreatePublicInvite($expirationDays: Int!){
        alphaOrganizationCreatePublicInvite(expirationDays: $expirationDays){
            id
            key
            ttl
        }
    }
`;

export const OrganizationDeletePublicInviteMutation = gql`
    mutation OrganizationDeletePublicInvite{
        alphaOrganizationDeletePublicInvite
    }
`;