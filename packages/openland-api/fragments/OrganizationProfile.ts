import gql from 'graphql-tag';
export const OrganizationProfile = gql`
    fragment OrganizationProfile on OrganizationProfile {
        id
        iAmOwner
        name
        photo
        photoRef {
            uuid
            crop{
                x
                y
                w
                h
            }
        }
        website
        potentialSites{
            from
            to
        }
        siteSizes{
            from
            to
        }
        about
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