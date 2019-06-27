import gql from 'graphql-tag';
import { OrganizationShort } from './OrganizationShort';
import { UserBadge } from './UserBadge';

export const UserFull = gql`
    fragment UserFull on User {
        id
        name
        firstName
        lastName
        photo
        phone
        email
        website
        about
        location
        isBot
        isYou
        online
        lastSeen
        linkedin
        twitter
        shortname
        badges {
            ...UserBadge
        }
        primaryBadge {
            ...UserBadge
        }
        primaryOrganization {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
    ${UserBadge}
`;