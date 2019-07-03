import gql from 'graphql-tag';
import { OrganizationShort } from './OrganizationShort';

export const UserTiny = gql`
    fragment UserTiny on User {
        id
        isYou
        name
        firstName
        lastName
        photo
        shortname
        primaryOrganization {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
`;
