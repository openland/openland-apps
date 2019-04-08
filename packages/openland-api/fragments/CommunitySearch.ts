import gql from 'graphql-tag';

export const CommunitySearch = gql`
    fragment CommunitySearch on Organization {
        id
        superAccountId
        name
        photo
        isMine
        about
        status
        featured: alphaFeatured
        membersCount
    }
`;