import gql from 'graphql-tag';
import { UserShort } from './UserShort';

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
        websiteTitle
        about
        twitter
        facebook
        linkedin
        
        members: alphaOrganizationMembers{
            role
            user{
                ...UserShort

                photoRef {
                    uuid
                    crop {
                        x
                        y
                        w
                        h
                    }
                }
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
    ${UserShort}
`;