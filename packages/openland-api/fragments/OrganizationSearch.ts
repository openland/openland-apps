import gql from 'graphql-tag';

export const OrganizationSearch = gql`
    fragment OrganizationSearch on Organization {
        id
        superAccountId
        name
        photo
        isMine
        about
        status
        membersCount
        featured: alphaFeatured
        members: alphaOrganizationMembers {
            user {
                id
                name
                photo
            }
        }
    }
`;
