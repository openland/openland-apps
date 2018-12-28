import gql from 'graphql-tag';
import { OrganizationShort } from './OrganizationShort';

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
        shortname
        primaryOrganization {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
`;