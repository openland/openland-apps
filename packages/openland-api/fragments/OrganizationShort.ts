import gql from 'graphql-tag';

export const OrganizationShort = gql`
    fragment OrganizationShort on Organization {
        id
        name
        photo
        location
    }
`;