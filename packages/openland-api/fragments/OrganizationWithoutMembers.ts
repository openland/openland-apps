import gql from 'graphql-tag';
import { UserFull } from './UserFull';
import { RoomShort } from './RoomShort';

export const OrganizationWithoutMembers = gql`
    fragment OrganizationWithoutMembers on Organization {
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
