import gql from 'graphql-tag';

export const OrganizationSearch = gql`
    fragment OrganizationSearch on Organization {
        id
        name
        photo
        locations: alphaLocations
        isMine
        organizationType: alphaOrganizationType
        interests: alphaInterests
        followed: alphaFollowed
        published: alphaPublished
        editorial: alphaEditorial
        featured: alphaFeatured
        members: alphaOrganizationMembers{
            user{
               id
               name
               picture
            }
        }
        channels: alphaCreatedChannels{
            id
        }
    }
`;