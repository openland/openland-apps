import gql from 'graphql-tag';
import { UserFull } from './UserFull';
import { RoomShort } from './RoomShort';

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
        id
        superAccountId
        isMine
        isOwner: alphaIsOwner
        featured: alphaFeatured
        isCommunity: alphaIsCommunity
        name
        photo

        website
        about
        twitter
        facebook
        linkedin
        
        members: alphaOrganizationMembers {
            role
            user {
                ...UserFull
            }
        }

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