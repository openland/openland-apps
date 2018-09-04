import gql from 'graphql-tag';
import { OrganizationFull } from '../fragments/OrganizationFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { OrganizationProfileFull } from '../fragments/OrganizationProfileFull';
import { UserShort } from '../fragments/UserShort';
import { OrganizationSearch } from '../fragments/OrganizationSearch';

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
        organizationProfile: myOrganizationProfile {
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
    mutation UpdateOrganization($input: UpdateOrganizationProfileInput!, $organizationId: ID) {
        updateOrganizationProfile(input: $input, id: $organizationId) {
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

export const OrganizationProfileQuery = gql`
    query OrganizationProfile($organizationId: ID!) {
        organizationProfile(id: $organizationId) {
            ...OrganizationProfileFull
        }
    }
    ${OrganizationProfileFull}
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
    query ExploreOrganizations($query: String, $sort: String, $page: Int) {
        items: alphaOrganizations(query: $query, sort: $sort, page: $page, first: 25) {
            edges {
                node {
                    ...OrganizationSearch
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
    ${OrganizationSearch}
`;

export const ExploreComunityQuery = gql`
    query ExploreComunity($query: String, $sort: String, $page: Int) {
        items: alphaComunityPrefixSearch(query: $query, sort: $sort, page: $page, first: 25) {
            edges {
                node {
                    ...OrganizationSearch
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
    ${OrganizationSearch}
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
                showInContacts
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
    mutation OrganizationCreatePublicInvite($expirationDays: Int){
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

export const OrganizationInviteOrganizationMutation = gql`
    mutation OrganizationInviteOrganization($inviteRequests: [InviteRequestOrganization!]!) {
        alphaOrganizationInviteOrganization(inviteRequests: $inviteRequests)
    }
`;

export const OrganizationPublicInviteOrganizatonsQuery = gql`
    query OrganizationPublicInviteOrganizatons{
        publicInvite: alphaOrganizationPublicInviteForOrganizations{
            id
            key
            ttl
        }
    }
`;

export const OrganizationCreatePublicInviteOrganizatonsMutation = gql`
    mutation OrganizationCreatePublicInviteOrganizatons($expirationDays: Int){
        alphaOrganizationCreatePublicInviteForOrganizations(expirationDays: $expirationDays){
            id
            key
            ttl
        }
    }
`;

export const OrganizationDeletePublicInviteOrganizatonsMutation = gql`
    mutation OrganizationDeletePublicInviteOrganizatons{
        alphaOrganizationDeletePublicInviteForOrganizations
    }
`;

export const OrganizationActivateByInviteMutation = gql`
    mutation OrganizationActivateByInvite($inviteKey: String!) {
        alphaJoinGlobalInvite(key: $inviteKey)
    }
`;

export const OrganizationAlterPublishedMutation = gql`
    mutation OrganizationAlterPublished($organizationId: ID!, $published: Boolean!) {
        alphaAlterPublished(id: $organizationId, published: $published){
            ...OrganizationSearch
        }
    }
    ${OrganizationSearch}
`;

export const HitsPopularQuery = gql`
    query HitsPopular($categories: [String!]!){
        hitsPopular: alphaHitsPopular(categories: $categories){
            category
            tags
        }
    }
`;

export const HitsAddMutation = gql`
    mutation HitsAdd($hits: [HitInput!]!){
        hitsAdd: alphaHitsAdd(hits: $hits)
    }
`;

export const AlterMemberAsContactMutation = gql`
    mutation AlterMemberAsContact($orgId: ID!, $memberId: ID!, $showInContacts: Boolean!){
        alphaAlterMemberAsContact(orgId: $orgId, memberId: $memberId,  showInContacts: $showInContacts)
    }
`;

export const OrganizationByPrefixQuery = gql`
    query OrganizationByPrefix($query: String!){
        organizationByPrefix: alphaOrganizationByPrefix(query: $query){
            ...OrganizationSearch
        }
    }
    ${OrganizationSearch}
`;
