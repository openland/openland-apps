import gql from 'graphql-tag';
import { OrganizationShort } from './OrganizationShort';
import { UserBadge } from './UserBadge';

export const UserShort = gql`
    fragment UserShort on User {
        id
        name
        firstName
        lastName
        photo
        email
        online
        lastSeen
        isYou
        isBot
        shortname
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