import gql from 'graphql-tag';
import { UserFull } from './UserFull';

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
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
    }
    ${UserFull}
`;
