import gql from 'graphql-tag';

export const OrganizationSearch = gql`
    fragment OrganizationSearch on Organization {
        id
        name
        photo
        location
        isMine
        organizationType: alphaOrganizationType
        interests: alphaInterests
        followed: alphaFollowed
        
    }
`;