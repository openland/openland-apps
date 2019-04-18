import gql from 'graphql-tag';
import { UserFull } from './UserFull';
import { RoomShort } from './RoomShort';

export const OrganizationWithoutMembersFragment = gql`
    fragment OrganizationWithoutMembersFragment on Organization {
        id
        superAccountId
        isMine
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

        membersCount

        requests: alphaOrganizationMemberRequests {
            role
            user {
                ...UserFull
            }
        }

        rooms: betaPublicRooms {
            ...RoomShort
        }
    }
    ${UserFull}
    ${RoomShort}
`;
