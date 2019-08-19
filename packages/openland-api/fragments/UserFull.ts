import gql from 'graphql-tag';
import { OrganizationShort } from './OrganizationShort';

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
        instagram
        twitter
        shortname
        audienceSize
        primaryOrganization {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
`;