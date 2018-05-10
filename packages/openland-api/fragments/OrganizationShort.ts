import gql from 'graphql-tag';
import { ProjectShort } from './ProjectShort';

export const OrganizationShort = gql`
    fragment OrganizationShort on Organization {
        id
        slug
        title
        comments
        logo
        url
        isDeveloper
        isConstructor
        developerIn {
            ...ProjectShort
        }
        constructorIn {
            ...ProjectShort
        }
    }
    ${ProjectShort}
`;
