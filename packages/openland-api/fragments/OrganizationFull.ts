import gql from 'graphql-tag';
import { UserShort } from './UserShort';
import { UserFull } from './UserFull';

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
        
        members: alphaOrganizationMembers{
            role
            user{
                ...UserFull
            }
        }

        requests: alphaOrganizationMemberRequests{
            role
            user{
                ...UserFull
            }
        }

        channels: alphaCreatedChannels{
            id
            isRoot
            title
            photos
            photo
            membersCount
            memberRequestsCount
            hidden
            featured
        }
    }
    ${UserFull}
`;