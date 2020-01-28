import gql from 'graphql-tag';
import { UserFull } from './UserFull';

export const OrganizationWithoutMembersFragment = gql`
    fragment OrganizationWithoutMembersFragment on Organization {
        id
        superAccountId
        isMine
        isPrivate: alphaIsPrivate
        isOwner: betaIsOwner
        isAdmin: betaIsAdmin
        featured: alphaFeatured
        isCommunity: alphaIsCommunity
        name
        photo

        shortname

        website
        about
        twitter
        facebook
        linkedin
        instagram

        membersCount

        requests: alphaOrganizationMemberRequests {
            role
            user {
                ...UserFull
            }
        }

        roomsCount: betaPublicRoomsCount
    }
    ${UserFull}
`;
