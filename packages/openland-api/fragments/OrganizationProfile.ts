import gql from 'graphql-tag';
export const OrganizationProfile = gql`
    fragment OrganizationProfile on OrganizationProfile {
        id
        iAmOwner
        title
        logo
        website
        potentialSites{
            from
            to
        }
        siteSizes{
            from
            to
        }
        description
        twitter
        facebook
        developmentModels
        availability
        contacts{
            name
            avatar
            role
            email
            phone
            link
        }
        landUse
        goodFor
        specialAttributes
    }
`;