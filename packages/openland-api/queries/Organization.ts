import gql from 'graphql-tag';
import { OrganizationFull } from '../fragments/OrganizationFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { OrganizationProfileFull } from '../fragments/OrganizationProfileFull';
import { OrganizationSearch } from '../fragments/OrganizationSearch';

export const MyOrganizationsQuery = gql`
    query MyOrganizations {
        myOrganizations {
            ...OrganizationShort

            isPrimary: betaIsPrimary
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

export const SetOrgShortnameMutation = gql`
    mutation SetOrgShortname($organizationId: ID!, $shortname: String!) {
        alphaSetOrgShortName(id: $organizationId, shortname: $shortname)
    }
`;

export const OrganizationQuery = gql`
    query Organization($organizationId: ID!) {
        organization(id: $organizationId) {
            ...OrganizationFull
        }
    }
    ${OrganizationFull}
`;

export const OrganizationMembersShortQuery = gql`
    query OrganizationMembersShort($organizationId: ID!) {
        organization(id: $organizationId) {
            members: alphaOrganizationMembers {
                user {
                    id
                }
            }
        }
    }
`;

export const OrganizationProfileQuery = gql`
    query OrganizationProfile($organizationId: ID!) {
        organizationProfile(id: $organizationId) {
            ...OrganizationProfileFull
        }
    }
    ${OrganizationProfileFull}
`;

export const ExploreOrganizationsQuery = gql`
    query ExploreOrganizations(
        $query: String
        $prefix: String
        $sort: String
        $page: Int
        $after: String
        $all: Boolean
    ) {
        items: alphaOrganizations(
            query: $query
            prefix: $prefix
            sort: $sort
            page: $page
            first: 25
            after: $after
            all: $all
        ) {
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

export const OrganizationChangeMemberRoleMutation = gql`
    mutation OrganizationChangeMemberRole(
        $memberId: ID!
        $newRole: OrganizationMemberRole!
        $organizationId: ID!
    ) {
        alphaOrganizationChangeMemberRole(
            memberId: $memberId
            newRole: $newRole
            organizationId: $organizationId
        )
    }
`;

export const OrganizationAddMemberMutation = gql`
    mutation OrganizationAddMember($userIds: [ID!], $organizationId: ID!) {
        betaOrganizationMemberAdd(userIds: $userIds, organizationId: $organizationId) {
            ...OrganizationFull
        }
    }
    ${OrganizationFull}
`;

export const OrganizationRemoveMemberMutation = gql`
    mutation OrganizationRemoveMember($memberId: ID!, $organizationId: ID!) {
        alphaOrganizationRemoveMember(memberId: $memberId, organizationId: $organizationId)
    }
`;

export const OrganizationInviteMembersMutation = gql`
    mutation OrganizationInviteMembers($inviteRequests: [InviteRequest!]!, $organizationId: ID) {
        alphaOrganizationInviteMembers(
            inviteRequests: $inviteRequests
            organizationId: $organizationId
        )
    }
`;

export const OrganizationPublicInviteQuery = gql`
    query OrganizationPublicInvite($organizationId: ID) {
        publicInvite: alphaOrganizationInviteLink(organizationId: $organizationId) {
            id
            key
            ttl
        }
    }
`;

export const OrganizationCreatePublicInviteMutation = gql`
    mutation OrganizationCreatePublicInvite($expirationDays: Int, $organizationId: ID) {
        alphaOrganizationRefreshInviteLink(
            expirationDays: $expirationDays
            organizationId: $organizationId
        ) {
            id
            key
            ttl
        }
    }
`;

export const DeleteOrganizationMutation = gql`
    mutation DeleteOrganization($organizationId: ID!) {
        deleteOrganization(id: $organizationId)
    }
`;

export const OrganizationMemberRemoveMutation = gql`
    mutation OrganizationMemberRemove($userId: ID!, $organizationId: ID!) {
        betaOrganizationMemberRemove(userId: $userId, organizationId: $organizationId) {
            id
        }
    }
`;

export const OrganizationActivateByInviteMutation = gql`
    mutation OrganizationActivateByInvite($inviteKey: String!) {
        joinAppInvite(key: $inviteKey)
    }
`;

export const OrganizationAlterPublishedMutation = gql`
    mutation OrganizationAlterPublished($organizationId: ID!, $published: Boolean!) {
        alphaAlterPublished(id: $organizationId, published: $published) {
            ...OrganizationSearch
        }
    }
    ${OrganizationSearch}
`;

export const OrganizationByPrefixQuery = gql`
    query OrganizationByPrefix($query: String!) {
        organizationByPrefix: alphaOrganizationByPrefix(query: $query) {
            ...OrganizationSearch
        }
    }
    ${OrganizationSearch}
`;
