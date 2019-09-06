import gql from 'graphql-tag';
import { OrganizationFull } from '../fragments/OrganizationFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { OrganizationWithoutMembersFragment } from '../fragments/OrganizationWithoutMembersFragment';
import { OrganizationProfileFull } from '../fragments/OrganizationProfileFull';
import { OrganizationSearch } from '../fragments/OrganizationSearch';
import { CommunitySearch } from '../fragments/CommunitySearch';
import { UserShort } from 'openland-api/fragments/UserShort';

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
    ${UserShort}
`;

export const OrganizationWithoutMembersQuery = gql`
    query OrganizationWithoutMembers($organizationId: ID!) {
        organization(id: $organizationId) {
            ...OrganizationWithoutMembersFragment
        }
    }
    ${OrganizationWithoutMembersFragment}
`;

export const OrganizationMembersShortQuery = gql`
    query OrganizationMembersShort($organizationId: ID!) {
        organization(id: $organizationId) {
            ...OrganizationWithoutMembersFragment
            members: alphaOrganizationMembers {
                user {
                    id
                }
            }
        }
    }
    ${OrganizationWithoutMembersFragment}
`;

export const OrganizationMembersQuery = gql`
    query OrganizationMembers($organizationId: ID!, $first: Int, $after: ID) {
        organization(id: $organizationId) {
            id
            members: alphaOrganizationMembers(first: $first, after: $after) {
                role
                user {
                    ...UserShort
                }
            }
        }
    }
    ${UserShort}
`;

export const OrganizationProfileQuery = gql`
    query OrganizationProfile($organizationId: ID!) {
        organizationProfile(id: $organizationId) {
            ...OrganizationProfileFull
        }
    }
    ${OrganizationProfileFull}
`;

export const ExploreCommunityQuery = gql`
    query ExploreCommunity($query: String, $sort: String, $page: Int, $after: String, $featuredIfEmptyQuery: Boolean) {
        items: alphaComunityPrefixSearch(query: $query, sort: $sort, page: $page, first: 25, after: $after, featuredIfEmptyQuery: $featuredIfEmptyQuery) {
            edges {
                node {
                    ...CommunitySearch
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
    ${CommunitySearch}
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
        alphaOrganizationMemberAdd(userIds: $userIds, organizationId: $organizationId) {
            role
            user {
                ...UserShort
            }
        }
    }
    ${UserShort}
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
