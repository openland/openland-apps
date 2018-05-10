import gql from 'graphql-tag';
import { ProjectShort } from './ProjectShort';
import { OrganizationShort } from './OrganizationShort';

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
        id
        slug
        title
        comments
        logo
        cover
        url
        address
        city
        twitter
        linkedin
        facebook
        isDeveloper
        isConstructor
        description
        developerIn {
            ...ProjectShort
        }
        constructorIn {
            ...ProjectShort
        }
        partners {
            ...OrganizationShort
        }
    }
    ${ProjectShort}
    ${OrganizationShort}
`;