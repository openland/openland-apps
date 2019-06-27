import gql from 'graphql-tag';
import { OrganizationShort } from './OrganizationShort';
import { UserBadge } from './UserBadge';

export const UserTiny = gql`
    fragment UserTiny on User {
        id
        isYou
        name
        firstName
        lastName
        photo
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
